package com.example.sasu.asistente_nutricional_tfg_2017.utilidades;

import android.Manifest;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Environment;
import android.support.annotation.RequiresApi;
import android.util.Log;
import android.widget.Toast;


import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.FoodRegistryBody;
import com.example.sasu.asistente_nutricional_tfg_2017.models.News;
import com.example.sasu.asistente_nutricional_tfg_2017.models.NewsBody;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Patient;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Registros;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Row;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Tabla;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
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
                System.out.println("Ha fallado 2: " + t);
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


                System.out.println("Ha fallado: " + t);
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

                    List<Tabla> aList = Tabla.find(Tabla.class, null, null, null, "CREATETIME DESC", "100");

                    Date date = new Date(Long.parseLong(response.body().getTIME()));

                    DateFormat format = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

                    Tabla al=null;

                    if (aList.size() != 0)
                    {
                        al = aList.get(0);

                    }
                    Date uno;

                    if(al != null)
                        uno = new Date(al.getCREATETIME());

                    Date dos = new Date(Long.parseLong(response.body().getTIME()));

                    Long d = new Long("1503046683353");

                    Date prueba = new Date(d);

                    if( al != null && new Date(al.getCREATETIME()).getTime() == Long.parseLong(response.body().getTIME())){

                    } else if(al == null || new Date(al.getCREATETIME()).getTime() < Long.parseLong(response.body().getTIME())) {
                        syncFoodRegisterDBDownload();
                    }else{
                        syncFoodRegisterDBUpload();
                    }

                }

            }

            @Override
            public void onFailure(Call<Row> call, Throwable t) {
                System.out.println("Ha fallado 3: " + t);
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
                    rs.get(i).setPHOTO(loadImages(rs.get(i).getPHOTO()));

                    rs.get(i).save();

                }

            }

            @Override
            public void onFailure(Call<List<Alimento>> call, Throwable t) {

            }

        });
    }

    public String loadImages(String url){

        String urlServer = "http://mrsasuu.hopto.org";
        String fileName = urlServer + url;
        /*String fileName = url.substring(18);

        Picasso.with(c)
                .load(urlServer + url)
                .into(getTarget(fileName));*/

        return fileName;
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    public void checkPermission(){
       /*if(c.checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE)){

       }*/
    }

    private static Target getTarget(final String url){
        Target target = new Target(){

            @Override
            public void onBitmapLoaded(final Bitmap bitmap, Picasso.LoadedFrom from) {
                new Thread(new Runnable() {

                    @Override
                    public void run() {

                        File file = new File(Environment.getExternalStorageDirectory().getPath() + "/" + url);
                        try {
                            file.createNewFile();
                            FileOutputStream ostream = new FileOutputStream(file);
                            bitmap.compress(Bitmap.CompressFormat.JPEG, 80, ostream);
                            ostream.flush();
                            ostream.close();
                        } catch (IOException e) {
                            Log.e("IOException", e.getLocalizedMessage());
                        }
                    }
                }).start();

            }

            @Override
            public void onBitmapFailed(Drawable errorDrawable) {

            }

            @Override
            public void onPrepareLoad(Drawable placeHolderDrawable) {

            }
        };
        return target;
    }

    /**
     * Método para sincronizar los registros locales de los objetivos
     */
    private void syncObjetiveDB() {

    }

    private void upload(){
        int id = Integer.parseInt(mPrefs.getString(PREF_PATIENT_ID, null));

        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -2);
        Date time = cal.getTime();

        Registros request = null;

        List<Tabla> aList = Tabla.listAll(Tabla.class);

        for(int i  = 0; i < aList.size(); i++){


            String fecha = "";

            String[] parts = aList.get(i).getFecha().split("-");

            fecha = parts[0]+ "-0"+parts[1]+"-"+parts[2];


            // Date date = new Date(fecha);

            DateFormat df = new SimpleDateFormat("dd-MM-yyyy");


            Date dataFrom = new Date();
            try {
                dataFrom = df.parse(fecha);
            } catch (ParseException e) {
                e.printStackTrace();
            }

            if(dataFrom.getTime() < time.getTime()){
                aList.get(i).delete();
            }
        }

        List<Tabla> aList2 = Tabla.listAll(Tabla.class);

            for(int j = 0;j < aList2.size();j++)
            {

                Alimento al = Alimento.findById(Alimento.class,aList2.get(j).getId());

                String fecha = "";

                String[] parts = aList2.get(j).getFecha().split("-");

                fecha = parts[0]+ "-0"+parts[1]+"-"+parts[2];


                // Date date = new Date(fecha);

                DateFormat df = new SimpleDateFormat("dd-MM-yyyy");





                Date dataFrom = new Date();
                try {
                    dataFrom = df.parse(fecha);
                } catch (ParseException e) {
                    e.printStackTrace();
                }

            request = new Registros(id,al.getFOODID(),aList2.get(j).getHorario_comida(),dataFrom.getTime(),0,aList2.get(j).getCREATETIME());

             Call<com.example.sasu.asistente_nutricional_tfg_2017.models.Response> uploadRegistry = api.syncUpload(request);
            uploadRegistry.enqueue(new Callback<com.example.sasu.asistente_nutricional_tfg_2017.models.Response>()

            {
                @Override
                public void onResponse(Call<com.example.sasu.asistente_nutricional_tfg_2017.models.Response> call, Response<com.example.sasu.asistente_nutricional_tfg_2017.models.Response> response) {

                    System.out.println(response.body().getMSG());


                }

                @Override
                public void onFailure(Call<com.example.sasu.asistente_nutricional_tfg_2017.models.Response> call, Throwable t) {
                    System.out.println("Ha fallado la subida del registro: " + t);
                }

            });

        }

    }

    /**
     * Método para sincronizar los registros alimentarios locales
     */
    private void syncFoodRegisterDBUpload() {
        int id = Integer.parseInt(mPrefs.getString(PREF_PATIENT_ID, null));


        Call<com.example.sasu.asistente_nutricional_tfg_2017.models.Response> deleteWeek = api.deleteWeek(new NewsBody(id,""));
        deleteWeek.enqueue(new Callback<com.example.sasu.asistente_nutricional_tfg_2017.models.Response>()

        {
            @Override
            public void onResponse(Call<com.example.sasu.asistente_nutricional_tfg_2017.models.Response> call, Response<com.example.sasu.asistente_nutricional_tfg_2017.models.Response> response) {



                int progress = Integer.parseInt(response.body().getMSG());


                if( progress == 1){
                    upload();
                    System.out.println("Llega");
                }


            }

            @Override
            public void onFailure(Call<com.example.sasu.asistente_nutricional_tfg_2017.models.Response> call, Throwable t) {
                System.out.println("Ha fallado la orden de eliminar: " + t);
            }

        });







    }

    /**
     * Método para sincronizar los registros alimentarios locales
     */
    private void syncFoodRegisterDBDownload() {

        List<Tabla> aList = Tabla.find(Tabla.class, null, null, null, "createtime DESC", "1");

        Tabla al;

        if (aList.size() != 0)
        {
            al = aList.get(0);

        }
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
