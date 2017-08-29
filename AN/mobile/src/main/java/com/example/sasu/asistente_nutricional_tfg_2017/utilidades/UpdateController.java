package com.example.sasu.asistente_nutricional_tfg_2017.utilidades;


import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.os.Build;
import android.os.Environment;
import android.os.IBinder;
import android.preference.PreferenceManager;
import android.support.annotation.IntDef;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.util.Log;


import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.FoodRegistryBody;
import com.example.sasu.asistente_nutricional_tfg_2017.models.News;
import com.example.sasu.asistente_nutricional_tfg_2017.models.NewsBody;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Objetivo;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Patient;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Registros;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Row;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Tabla;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;
import com.squareup.picasso.Picasso;
import com.squareup.picasso.Target;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


/**
 * Manejador de preferencias de la sesión del paciente
 */
public class UpdateController extends Service {

    public static final String PREFS_NAME = "AN_PREFS";
    public static final String PREF_PATIENT_ID = "PREF_USER_ID";
    public static final String PREF_PATIENT_NUTRITIONIST_ID = "PREF_PATIENT_NUTRITIONIST_ID";
    public static final String PREF_PATIENT_NEWS = "PREF_PATIENT_NEWS";
    public static final String PREF_PATIENT_TOKEN = "PREF_PATIENT_TOKEN";
    public static final int SERVICE_ID = 1456778;
    private static Context c;
    private boolean completed;


    private Api api;


    private SharedPreferences mPrefs;


    private static UpdateController INSTANCE;

    public void setContext(Context c){
        this.c = c;
    }

    public static UpdateController get(Context context) {
        if (INSTANCE == null) {
            c = context;
            INSTANCE = new UpdateController(context);
        }
        return INSTANCE;
    }

    public UpdateController(){
       // Context ctx = getApplicationContext();
        /*mPrefs = PreferenceManager.getDefaultSharedPreferences(this);

        Retrofit mRestAdapter = new Retrofit.Builder()
                .baseUrl(Api.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        api = mRestAdapter.create(Api.class);*/
    }

    public UpdateController(Context context) {

        /*Context ctx = getApplicationContext();
        mPrefs = PreferenceManager.getDefaultSharedPreferences(ctx);
        //mPrefs = this.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);

        Retrofit mRestAdapter = new Retrofit.Builder()
                .baseUrl(Api.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        api = mRestAdapter.create(Api.class);*/

        //mIsLoggedIn = !TextUtils.isEmpty(mPrefs.getString(PREF_PATIENT_TOKEN, null));
    }


    public boolean updateDB() {
        /*Testing*/
        /*SharedPreferences.Editor editor = mPrefs.edit();

        editor.putString(PREF_PATIENT_TOKEN, null);
        editor.apply();*/


        //mPrefs = PreferenceManager.getDefaultSharedPreferences(this);
        mPrefs = c.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);

        Retrofit mRestAdapter = new Retrofit.Builder()
                .baseUrl(Api.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        api = mRestAdapter.create(Api.class);


        completed = true;
        String token = mPrefs.getString(PREF_PATIENT_TOKEN, null);
        String idS  = mPrefs.getString(PREF_PATIENT_ID,"-1");
        int id = Integer.parseInt(idS);




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


        //DEBUG
        //Tabla.deleteAll(Tabla.class);
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

        //Sincronizamos los objetivos del paciente si se ha añadido alguno nuevo.
        Call<News> newsCall = api.news(new NewsBody(id, token));
        newsCall.enqueue(new Callback<News>() {
            @Override
            public void onResponse(Call<News> call, Response<News> response) {
                if (response.body().getERROR() != null) {
                    applyError(response.body().getERROR());
                } else {
                    //if (response.body().getNEWS() == 1) {
                        syncObjetiveDB();
                    //}
                }
            }

            @Override
            public void onFailure(Call<News> call, Throwable t) {
                System.out.println("Ha fallado 2: " + t);
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
                    rs.get(i).setMINPHOTO(loadImages(rs.get(i).getMINPHOTO()));
                    rs.get(i).setMEDPHOTO(loadImages(rs.get(i).getMEDPHOTO()));
                    rs.get(i).setMAXPHOTO(loadImages(rs.get(i).getMAXPHOTO()));

                    rs.get(i).save();

                }

            }

            @Override
            public void onFailure(Call<List<Alimento>> call, Throwable t) {
                System.out.println("Error sincronizando alimentos");
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
    public void syncObjetiveDB() {

        int id = Integer.parseInt(mPrefs.getString(PREF_PATIENT_ID, null));

        Objetivo.deleteAll(Objetivo.class);

        Call<List<Objetivo>> objetives = api.objetives(id);
        objetives.enqueue(new Callback<List<Objetivo>>() {
            @Override
            public void onResponse(Call<List<Objetivo>> call, Response<List<Objetivo>> response) {

                List<Objetivo> rs = response.body();

                for (int i = 0; i < rs.size(); i++) {

                    List<Alimento> alimentos = Alimento.find(Alimento.class, "FOODID = ?", Integer.toString(rs.get(i).getFOODID()));

                    Alimento al = Alimento.find(Alimento.class,"FOODID = ?", Integer.toString(rs.get(i).getFOODID())).get(0);

                    rs.get(i).setPHOTO(al.getPHOTO());
                    rs.get(i).setFOODNAME(al.getNAME());

                    rs.get(i).save();

                }

            }

            @Override
            public void onFailure(Call<List<Objetivo>> call, Throwable t) {
                System.out.println("Error sincronizando objetivos");
            }

        });


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

                Alimento al = Alimento.findById(Alimento.class,aList2.get(j).getIdAlimento());

                String fecha = "";

                String[] parts = aList2.get(j).getFecha().split("-");

                fecha = Integer.toString(Integer.parseInt(parts[0]))+ "-0"+parts[1]+"-"+parts[2] +" 04:00" ;


                // Date date = new Date(fecha);

                DateFormat df = new SimpleDateFormat("dd-MM-yyyy HH:mm");





                Date dataFrom = new Date();
                try {
                    dataFrom = df.parse(fecha);
                } catch (ParseException e) {
                    e.printStackTrace();
                }

                String horario = aList2.get(j).getHorario();

                if(horario.equals(HorarioComida.MERIENDA_TARDE.toString()))
                {
                    horario = "MERIENDA";
                }

            request = new Registros(id,al.getFOODID(),horario,dataFrom.getTime(),aList2.get(j).getAmount(),aList2.get(j).getCREATETIME());

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

        int id = Integer.parseInt(mPrefs.getString(PREF_PATIENT_ID, "-1"));

        /*List<Tabla> aList = Tabla.find(Tabla.class, null, null, null, "createtime DESC", "1");



        Tabla al;

        if (aList.size() != 0)
        {
            al = aList.get(0);

        }

        */


        //Eliminamos los registros de la base de datos.
        Tabla.deleteAll(Tabla.class);

        Call<List<Tabla>> registers = api.registers(new NewsBody(id,""));
        registers.enqueue(new Callback<List<Tabla>>() {
            @Override
            public void onResponse(Call<List<Tabla>> call, Response<List<Tabla>> response) {

                List<Tabla> rs = response.body();

                for (int i = 0; i < rs.size(); i++) {
                    //rs.get(i).setPHOTO(loadImages(rs.get(i).getPHOTO()));

                    Alimento al =  Alimento.find(Alimento.class,"FOODID = ?", rs.get(i).getIdAlimento().toString()).get(0);

                    if(rs.get(i).getHorario().equals("MERIENDA")){
                        rs.get(i).setHorario(HorarioComida.MERIENDA_TARDE);
                    }

                    rs.get(i).setIdAlimento(al.getId());
                    rs.get(i).save();

                }

            }

            @Override
            public void onFailure(Call<List<Tabla>> call, Throwable t) {
                System.out.println("Error obteniendo los registros del server");
            }

        });

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

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        this.c = getApplicationContext();
        super.onCreate();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        updateDB();
        return super.onStartCommand(intent, flags, startId);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }
}
