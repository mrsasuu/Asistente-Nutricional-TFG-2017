package com.example.sasu.asistente_nutricional_tfg_2017.utilidades;

import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Comida;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;

import java.util.Date;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ControllerPreferences {
    private static ControllerPreferences instance = null;
    private Comida comida;
    private HorarioComida horarioRegistrar;
    private Api api;
    private Retrofit mRestAdapter;

    public Date fechaActual;

    public HorarioComida getHorarioRegistrar() {
        return horarioRegistrar;
    }

    public void setHorarioRegistrar(HorarioComida horarioRegistrar) {
        this.horarioRegistrar = horarioRegistrar;
    }

    public void registrarComidaHorario(Alimento al){
        comida.registrarComidaHorario(horarioRegistrar,al);
        //comida.save();
    }

    public ControllerPreferences() {
        /*Date hoy = new Date();
        Log.println(Log.INFO,"HORA", String.valueOf(hoy.getTime()));
        Calendar cal = Calendar.getInstance();
        cal.setTime(hoy);
        //Log.println(Log.INFO,"DIA",cal.getTime());
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);
        List<Comida> comidas = null;
        String fechaB = Integer.toString(day)+ "-" + Integer.toString(month)+"-" + Integer.toString(year);

        Log.v("","Buscamos la fecha: "+ fechaB);
        //try{
             //comidas = Comida.findWithQuery(Comida.class, "Select * from Comida where fecha = "+fechaB);
            //comidas = Comida.find(Comida.class,"fecha = ?",fechaB);

        /*}catch (Exception e){
            comida = new Comida(fechaB);
            comida.save();
        }*/
        
/*
        if(comidas.size() !=0){
            Log.println(Log.INFO,"Encontrado"," en la base de datos");
            comida = comidas.get(0);
        }else{
            Log.println(Log.INFO,"No encontrado"," en la base de datos");
            /*comida = new Comida(fechaB);
            comida.save();*/
            /*comida = Comida.findById(Comida.class, 1);
        }
        comida = Comida.findById(Comida.class, 1);
        comida = new Comida(fechaB);
        comida.save();

        comida = null;

        comidas = Comida.findWithQuery(Comida.class, "Select * from Comida where id = 1");
        comida = Comida.findById(Comida.class, 1);
*/

        comida = new Comida();
        fechaActual = new Date();

        mRestAdapter = new Retrofit.Builder()
                .baseUrl(Api.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        api =  mRestAdapter.create(Api.class);
    }

    public Comida getComida(){
        /*Date hoy = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(hoy);
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);
        List<Comida> comidas = null;
        String fechaB = Integer.toString(day)+ "-" + Integer.toString(month)+"-" + Integer.toString(year);

        try{
            comidas = Comida.find(Comida.class,"fecha = ?",fechaB);
        }catch (Exception e){
            comida = new Comida(fechaB);
            comida.save();
        }


        if(comidas.size() !=0){
            comida = comidas.get(0);
        }else{
            comida = new Comida(fechaB);
            comida.save();
        }*/

        return comida;
    }

    public Comida getComida(String fecha){
        comida = new Comida(fecha);

        return comida;
    }

    public Api getApi(){
        return api;
    }

    public static ControllerPreferences getInstance() {
         if(instance == null)
         {
             instance = new ControllerPreferences();
         }
        return instance;
    }


}