package com.example.sasu.asistente_nutricional_tfg_2017.utilidades;

import android.content.Context;
import android.content.SharedPreferences;
import android.widget.Toast;

import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.FoodRegistryBody;
import com.example.sasu.asistente_nutricional_tfg_2017.models.News;
import com.example.sasu.asistente_nutricional_tfg_2017.models.NewsBody;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Patient;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Row;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Tabla;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


/**
 * Manejador de preferencias de la sesión del paciente
 */
public class UpdateController {

    public static final String PREFS_NAME = "AN_PREFS";
    public static final String PREF_PATIENT_ID = "PREF_USER_ID";
    public static final String PREF_PATIENT_NUTRITIONIST_ID = "PREF_PATIENT_NUTRITIONIST_ID";
    public static final String PREF_PATIENT_NEWS = "PREF_PATIENT_NEWS";
    public static final String PREF_PATIENT_TOKEN = "PREF_PATIENT_TOKEN";
    private static Context c;
    private boolean completed;


    private Api api;


    private final SharedPreferences mPrefs;


    private static UpdateController INSTANCE;

    public static UpdateController get(Context context) {
        if (INSTANCE == null) {
            c = context;
            INSTANCE = new UpdateController(context);
        }
        return INSTANCE;
    }

    private UpdateController(Context context) {
        mPrefs = context.getApplicationContext()
                .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);

        Retrofit mRestAdapter = new Retrofit.Builder()
                .baseUrl(Api.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        api = mRestAdapter.create(Api.class);

        //mIsLoggedIn = !TextUtils.isEmpty(mPrefs.getString(PREF_PATIENT_TOKEN, null));
    }

    public boolean updateDB() {
        /*Testing*/
        /*SharedPreferences.Editor editor = mPrefs.edit();

        editor.putString(PREF_PATIENT_TOKEN, null);
        editor.apply();*/

        completed = true;
        String token = mPrefs.getString(PREF_PATIENT_TOKEN, null);
        int id = Integer.parseInt(mPrefs.getString(PREF_PATIENT_ID, null));


        //Sincronizamos los objetivos del paciente si se ha añadido alguno nuevo.
        Call<News> newsCall = api.news(new NewsBody(id, token));
        newsCall.enqueue(new Callback<News>() {
            @Override
            public void onResponse(Call<News> call, Response<News> response) {
                if (response.body().getERROR() != null) {
                    applyError(response.body().getERROR());
                } else {
                    if (response.body().getNEWS() == 1) {
                        syncObjetiveDB();
                    }
                }
            }

            @Override
            public void onFailure(Call<News> call, Throwable t) {
                System.out.println("Ha fallado");
            }
        });

        //syncFoodDB();


        //Sincronizamos la base de datos local de alimentos si el número de filas de la base de datos es diferente.
        Call<Row> foodCall = api.foodCount("count");
        foodCall.enqueue(new Callback<Row>() {
            @Override
            public void onResponse(Call<Row> call, Response<Row> response) {

                if (response.body().getERROR() != null) {
                    applyError(response.body().getERROR());
                } else {
                    int num_alimentos = Alimento.listAll(Alimento.class).size();


                    List<Alimento> aList = Alimento.find(Alimento.class, null, null, null, "createtime DESC", "1");


                    Date date = new Date(Long.parseLong(response.body().getTIME()));

                    DateFormat format = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");


                    Alimento al = null;

                    if (aList.size() != 0)
                        al = aList.get(0);


                    if (al == null || al.getCREATETIME().getTime() < Long.parseLong(response.body().getTIME())) {
                        syncFoodDB();

                        System.out.println("Hecho");
                    }
                }

            }

            @Override
            public void onFailure(Call<Row> call, Throwable t) {

                System.out.println("Ha fallado");
            }

        });

        //Sincronizamos la base de datos local de alimentos si el número de filas de la base de datos es diferente.
        Call<Row> foodRegistryCall = api.numberRegisters(new FoodRegistryBody(id));
        foodRegistryCall.enqueue(new Callback<Row>()

        {
            @Override
            public void onResponse(Call<Row> call, Response<Row> response) {

                if (response.body().getERROR() != null) {
                    applyError(response.body().getERROR());
                } else {
                    int num_registros = Tabla.listAll(Tabla.class).size();

                    if (num_registros != response.body().getROWS()) {
                        syncFoodRegisterDB();
                    }
                }

            }

            @Override
            public void onFailure(Call<Row> call, Throwable t) {
                System.out.println("Ha fallado");
            }

        });


        return completed;
    }


    /**
     * Método para sincronizar los registros locales de alimentos
     */

    private void syncFoodDB() {
        System.out.println("Llega");

        Alimento.deleteAll(Alimento.class);

        Call<List<Alimento>> food = api.food("app");
        food.enqueue(new Callback<List<Alimento>>() {
            @Override
            public void onResponse(Call<List<Alimento>> call, Response<List<Alimento>> response) {

                List<Alimento> rs = response.body();

                for (int i = 0; i < rs.size(); i++) {
                    rs.get(i).save();
                }

            }

            @Override
            public void onFailure(Call<List<Alimento>> call, Throwable t) {

            }

        });
    }

    /**
     * Método para sincronizar los registros locales de los objetivos
     */
    private void syncObjetiveDB() {

    }

    /**
     * Método para sincronizar los registros alimentarios locales
     */
    private void syncFoodRegisterDB() {

    }

    private void applyError(String error) {
        switch (error) {
            case "INVALID TOKEN":
                SharedPreferences.Editor editor = mPrefs.edit();

                editor.putString(PREF_PATIENT_TOKEN, null);
                editor.apply();

                break;

        }

        completed = false;
    }


    public void savePatient(Patient patient) {
        if (patient != null) {
            SharedPreferences.Editor editor = mPrefs.edit();
            editor.putString(PREF_PATIENT_ID, Integer.toString(patient.getID()));
            editor.putString(PREF_PATIENT_NUTRITIONIST_ID, Integer.toString(patient.getNUTRITIONIST_ID()));
            editor.putString(PREF_PATIENT_NEWS, Integer.toString(patient.getNEWS()));
            editor.putString(PREF_PATIENT_TOKEN, patient.getTOKEN());
            editor.apply();


            System.out.println("true");
        }
    }

    public void logOut() {

        SharedPreferences.Editor editor = mPrefs.edit();
        editor.putString(PREF_PATIENT_ID, null);
        editor.putString(PREF_PATIENT_NUTRITIONIST_ID, null);
        editor.putString(PREF_PATIENT_NEWS, null);
        editor.putString(PREF_PATIENT_TOKEN, null);

        editor.apply();
    }
}
