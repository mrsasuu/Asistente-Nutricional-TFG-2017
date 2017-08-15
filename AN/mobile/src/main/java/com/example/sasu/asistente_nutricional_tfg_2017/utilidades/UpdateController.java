package com.example.sasu.asistente_nutricional_tfg_2017.utilidades;

import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;

import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.News;
import com.example.sasu.asistente_nutricional_tfg_2017.models.NewsBody;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Patient;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Row;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static com.example.sasu.asistente_nutricional_tfg_2017.prefs.SessionPrefs.PREF_PATIENT_NAME;
import static com.example.sasu.asistente_nutricional_tfg_2017.prefs.SessionPrefs.PREF_PATIENT_USERNAME;


/**
 * Manejador de preferencias de la sesión del paciente
 */
public class UpdateController {

    public static final String PREFS_NAME = "AN_PREFS";
    public static final String PREF_PATIENT_ID = "PREF_USER_ID";
    public static final String PREF_PATIENT_NUTRITIONIST_ID = "PREF_PATIENT_NUTRITIONIST_ID";
    public static final String PREF_PATIENT_NEWS = "PREF_PATIENT_NEWS";
    public static final String PREF_PATIENT_TOKEN = "PREF_PATIENT_TOKEN";
    private boolean completed;



    private Api api;



    private final SharedPreferences mPrefs;


    private static UpdateController INSTANCE;

    public static UpdateController get(Context context) {
        if (INSTANCE == null) {
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

        api =  mRestAdapter.create(Api.class);

        //mIsLoggedIn = !TextUtils.isEmpty(mPrefs.getString(PREF_PATIENT_TOKEN, null));
    }

    public boolean updateDB(){
        completed = true;
        String token = mPrefs.getString(PREF_PATIENT_TOKEN, null);
        int id = Integer.parseInt(mPrefs.getString(PREF_PATIENT_ID, null));


        //Sincronizamos los objetivos del paciente si se ha añadido alguno nuevo.
        Call<News> newsCall = api.news(new NewsBody(id,token));
        newsCall.enqueue(new Callback<News>() {
            @Override
            public void onResponse(Call<News> call, Response<News> response) {
                if(response.body().getError() != null){
                    applyError(response.body().getError());
                }else{
                    if(response.body().getNews() == 1){
                        syncObjetiveDB();
                    }
                }
            }

            @Override
            public void onFailure(Call<News> call, Throwable t) {

            }
        });

        //Sincronizamos la base de datos local de alimentos si el número de filas de la base de datos es diferente.
        Call<Row> foodCall = api.foodCount("count");
        foodCall.enqueue(new Callback<Row>() {
            @Override
            public void onResponse(Call<Row> call, Response<Row> response) {

                int num_alimentos = Alimento.listAll(Alimento.class).size();

                if(num_alimentos != response.body().getRows()){
                    syncFoodDB();
                }
            }

            @Override
            public void onFailure(Call<Row> call, Throwable t) {

            }

        });

        







        return completed;
    }


    private void syncFoodDB(){

    }

    private void syncObjetiveDB(){

    }

    private void applyError(String error){
        switch (error){
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
            editor.putString(PREF_PATIENT_ID,  Integer.toString(patient.getID()));
            editor.putString(PREF_PATIENT_NUTRITIONIST_ID, Integer.toString(patient.getNUTRITIONIST_ID()));
            editor.putString(PREF_PATIENT_NEWS,  Integer.toString(patient.getNEWS()));
            editor.putString(PREF_PATIENT_TOKEN, patient.getTOKEN());
            editor.apply();


            System.out.println("true");
        }
    }

    public void logOut(){

        SharedPreferences.Editor editor = mPrefs.edit();
        editor.putString(PREF_PATIENT_ID, null);
        editor.putString(PREF_PATIENT_NUTRITIONIST_ID, null);
        editor.putString(PREF_PATIENT_NEWS, null);
        editor.putString(PREF_PATIENT_TOKEN, null);

        editor.apply();
    }
}
