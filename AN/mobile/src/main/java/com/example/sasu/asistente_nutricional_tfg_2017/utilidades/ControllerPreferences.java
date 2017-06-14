package com.example.sasu.asistente_nutricional_tfg_2017.utilidades;

import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Comida;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;

import java.sql.SQLException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class ControllerPreferences {
    private static ControllerPreferences instance = null;
    private Comida comida;
    private HorarioComida horarioRegistrar;

    public HorarioComida getHorarioRegistrar() {
        return horarioRegistrar;
    }

    public void setHorarioRegistrar(HorarioComida horarioRegistrar) {
        this.horarioRegistrar = horarioRegistrar;
    }

    public void registrarComidaHorario(Alimento al){
        comida.registrarComidaHorario(horarioRegistrar,al);
        comida.save();
    }

    public ControllerPreferences() {
        Date hoy = new Date();
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
            comida = new Comida();
            comida.save();
        }
        

        if(comidas.size() !=0){
            comida = comidas.get(0);
        }else{
            comida = new Comida();
            comida.save();
        }

    }

    public Comida getComida(){
        return comida;
    }

    public static ControllerPreferences getInstance() {
         if(instance == null)
         {
             instance = new ControllerPreferences();
         }
        return instance;
    }
}