package com.example.sasu.asistente_nutricional_tfg_2017.utilidades;

import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Comida;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Tabla;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ControllerPreferences {
    private static ControllerPreferences instance = null;
    private Comida comida;
    private HorarioComida horarioRegistrar;
    private HorarioComida horarioConsultar;
    private double amount;
    private Api api;
    private Retrofit mRestAdapter;
    public Date HOY;

    Alimento al;

    public Date fechaActual;
    public String segundaFecha;
    public String hoyS;

    public HorarioComida getHorarioRegistrar() {
        return horarioRegistrar;
    }

    public void setHorarioRegistrar(HorarioComida horarioRegistrar) {
        this.horarioRegistrar = horarioRegistrar;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public void registrarComidaHorario(Alimento al){
        this.al = al;
        //comida.save();
    }

    public void registrarComidaFinal(double amount){
        this.amount = amount;
        comida.registrarComidaHorario(horarioRegistrar,al,amount);

    }

    public HorarioComida getHorarioConsultar() {
        return horarioConsultar;
    }

    public void setHorarioConsultar(HorarioComida horarioConsultar) {
        this.horarioConsultar = horarioConsultar;
    }

    public Alimento getAl() {
        return al;
    }

    public void setAl(Alimento al) {
        this.al = al;
    }

    public ControllerPreferences() {

        amount = 0;

        this.HOY = new Date();

        Date hoy = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(hoy);
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);
        this.hoyS = Integer.toString(day)+ "-" + Integer.toString(month)+"-" + Integer.toString(year);

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

    public String getSegundaFecha() {
        return segundaFecha;
    }

    public void setSegundaFecha(String segundaFecha) {
        this.segundaFecha = segundaFecha;
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

    public Comida getComidaHoy(){
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
        comida = new Comida(hoyS,0);
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
            instance = new ControllerPreferences();
        return instance;
    }


    public void eliminarComida(Alimento alimento) {


        Date hoy = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(hoy);
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH) - 1;
        String fechaB = Integer.toString(day)+ "-" + Integer.toString(month)+"-" + Integer.toString(year);

        String fecha23 = comida.getFecha();

        String horariop = horarioRegistrar.toString();

        List<Tabla> listaPorHorario =  Tabla.find(Tabla.class,"fecha = ? and horario = ? and alim = ?", comida.getFecha(),horarioConsultar.toString(),alimento.getId().toString());

        if(listaPorHorario.size() > 0)
        {
            Tabla del = listaPorHorario.get(0);
            del.delete();
        }


        List<Tabla> aList = Tabla.find(Tabla.class, null, null, null, "createtime DESC", "1");

        Tabla al;

        if (aList.size() != 0)
        {
            al = aList.get(0);

            al.setCREATETIME(new Date().getTime());

            al.save();

        }





        Date hoy2 = HOY;

        Calendar cal2 = Calendar.getInstance();
        cal2.setTime(hoy2);
        fechaActual = cal2.getTime();

        int year2 = cal2.get(Calendar.YEAR);
        int month2 = cal2.get(Calendar.MONTH) + 1;
        int day2 = cal2.get(Calendar.DAY_OF_MONTH);
        String fechaBa = Integer.toString(day2) + "-" + Integer.toString(month2) + "-" + Integer.toString(year2);
        //Toast.makeText(getContext(), "Buscamos la fecha: " + fechaB, Toast.LENGTH_LONG).show();
        setSegundaFecha(fechaBa);

        this.comida = getComida(fechaBa);
    }
}