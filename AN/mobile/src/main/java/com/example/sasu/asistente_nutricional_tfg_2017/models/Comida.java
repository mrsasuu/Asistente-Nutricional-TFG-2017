package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Sasu on 06/06/2017.
 */

public class Comida{
    String fecha;
    int id;
    ArrayList<HorarioComida> horarios = new ArrayList<>();


    Map<HorarioComida,List<Alimento>> comidas = new HashMap<>();

    public Comida() {

        Date hoy = new Date();
        Calendar cal = Calendar.getInstance();
        cal.setTime(hoy);
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);
        String fechaB = Integer.toString(day)+ "-" + Integer.toString(month)+"-" + Integer.toString(year);
        fecha = fechaB;



        horarios.add(HorarioComida.DESAYUNO);
        horarios.add(HorarioComida.ALMUERZO);
        horarios.add(HorarioComida.MERIENDA_TARDE);
        horarios.add(HorarioComida.CENA);
        horarios.add(HorarioComida.OTRO);

        for(int i = 0; i < horarios.size(); i++){
            //List<Tabla> listaPorHorario =  Tabla.find(Tabla.class,"fecha = ? and horarioComida = ?", fecha,horarios.get(i).toString());
            comidas.put(horarios.get(i),new ArrayList<Alimento>());
            //comidas.put(horarios.get(i),new ArrayList<Alimento>());


        }

        List<Tabla> todo = Tabla.listAll(Tabla.class);
        List<Alimento> alimen = Alimento.listAll(Alimento.class);

        for(int i = 0; i < horarios.size(); i++){


            List<Tabla> listaPorHorario =  Tabla.find(Tabla.class,"fecha = ? and horario = ?", fecha,horarios.get(i).toString());

            List<Alimento> alimentos =  new ArrayList<>();
            for(int j = 0; ((listaPorHorario!=null) && j < listaPorHorario.size());j++){
                Alimento al = Alimento.findById(Alimento.class, listaPorHorario.get(j).getIdAlimento());
                alimentos.add(al);
            }

            comidas.remove(horarios.get(i));
            comidas.put(horarios.get(i),alimentos);


        }






    }



    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }


    public void setId(int id) {
        this.id = id;
    }

    public Map<HorarioComida, List<Alimento>> getComidas() {
        return comidas;
    }

    public void setComidas(Map<HorarioComida, List<Alimento>> comidas) {
        this.comidas = comidas;
    }

    public void registrarComidaHorario(HorarioComida h, Alimento al){
        if(comidas.containsKey(h)){
            List<Alimento> alimentos = comidas.get(h);
            alimentos.add(al);

            comidas.remove(h);
            comidas.put(h,alimentos);
        }else{
            List<Alimento> alimentos = new ArrayList<>();
            alimentos.add(al);
            comidas.put(h,alimentos);
        }
        Tabla nuevo = new Tabla(fecha,h.toString(),al.getId(),new Date().getTime());
        nuevo.save();
    }
    public Comida(String hoy,int nada) {


        horarios.add(HorarioComida.DESAYUNO);
        horarios.add(HorarioComida.ALMUERZO);
        horarios.add(HorarioComida.MERIENDA_TARDE);
        horarios.add(HorarioComida.CENA);
        horarios.add(HorarioComida.OTRO);

        for(int i = 0; i < horarios.size(); i++){
            //List<Tabla> listaPorHorario =  Tabla.find(Tabla.class,"fecha = ? and horarioComida = ?", fecha,horarios.get(i).toString());
            comidas.put(horarios.get(i),new ArrayList<Alimento>());
            //comidas.put(horarios.get(i),new ArrayList<Alimento>());


        }

        for(int i = 0; i < horarios.size(); i++){
            List<Tabla> listaPorHorario =  Tabla.find(Tabla.class,"fecha = ? and horario = ?", hoy,horarios.get(i).toString());
            List<Alimento> alimentos =  new ArrayList<>();
            for(int j = 0; (listaPorHorario!=null)&&(j < listaPorHorario.size());j++){
                Alimento al = Alimento.findById(Alimento.class, listaPorHorario.get(j).getIdAlimento());
                alimentos.add(al);
            }

            comidas.remove(horarios.get(i));
            comidas.put(horarios.get(i),alimentos);


        }
    }

    public Comida(String fecha) {
        this.fecha = fecha;


        horarios.add(HorarioComida.DESAYUNO);
        horarios.add(HorarioComida.ALMUERZO);
        horarios.add(HorarioComida.MERIENDA_TARDE);
        horarios.add(HorarioComida.CENA);
        horarios.add(HorarioComida.OTRO);

        for(int i = 0; i < horarios.size(); i++){
            //List<Tabla> listaPorHorario =  Tabla.find(Tabla.class,"fecha = ? and horarioComida = ?", fecha,horarios.get(i).toString());
            comidas.put(horarios.get(i),new ArrayList<Alimento>());
            //comidas.put(horarios.get(i),new ArrayList<Alimento>());


        }

        for(int i = 0; i < horarios.size(); i++){
            List<Tabla> listaPorHorario =  Tabla.find(Tabla.class,"fecha = ? and horario = ?", fecha,horarios.get(i).toString());
            List<Alimento> alimentos =  new ArrayList<>();
            for(int j = 0; (listaPorHorario!=null)&&(j < listaPorHorario.size());j++){
                Alimento al = Alimento.findById(Alimento.class, listaPorHorario.get(j).getIdAlimento());
                alimentos.add(al);
            }

            comidas.remove(horarios.get(i));
            comidas.put(horarios.get(i),alimentos);


        }
    }

    public List<Alimento> getLista(HorarioComida desayuno) {
        List<Alimento> alimentos = new ArrayList<>();
        if(comidas.containsKey(desayuno)){
            alimentos = comidas.get(desayuno);

        }

        return alimentos;
    }

    public void save(){
        for(int i = 0; i < comidas.size(); i++){
            List<Alimento> alim = comidas.get(horarios.get(i));

            List<Tabla> listaPorHorario =  Tabla.find(Tabla.class,"fecha = ? and horario = ?", fecha,horarios.get(i).toString());

            for(int j = 0; j < alim.size(); j++){
                Tabla comida = new Tabla(fecha,horarios.get(i).toString(),alim.get(j).getId(),new Date().getTime());
                if(!listaPorHorario.contains(comida)){
                    comida.save();
                    //alim.get(i).save();
                }
            }
        }
    }

    public void eliminarRegistrosNoUsados(){
        for(int i = 0; i < comidas.size(); i++){
            List<Alimento> alim = comidas.get(horarios.get(i));

            List<Tabla> listaPorHorario =  Tabla.find(Tabla.class,"fecha = ? and horario = ?", fecha,horarios.get(i).toString());
            //Tabla comida = new Tabla(fecha,horarios.get(i).toString(),alim.get(i).getId());
            for(int j = 0; j < listaPorHorario.size(); j++){
                Alimento al = Alimento.findById(Alimento.class,listaPorHorario.get(j).getIdAlimento());
                if(!alim.contains(al)){
                    al.delete();
                    //alim.get(i).save();
                }
            }
        }
    }

    /*
    //Metodo para convertir la comida a un contentValue para posteriormente ser insertado en la base de datos de las comidas.
    public ContentValues toContentValues() {
        //No implementado.

        ContentValues values = new ContentValues();

        for(int i = 0; i < comidas.size() ; i++){
            values.put(RegistroDB.AlimentosEntrada.ID, comidas.get(i).getId());

            values.put(RegistroDB.AlimentosEntrada.NOMBRE, comidas.get(i).getNAME());
            values.put(RegistroDB.AlimentosEntrada.GRUPO, comidas.get(i).getGrupo());
            values.put(RegistroDB.AlimentosEntrada.SUB_GRUPO, comidas.get(i).getSub_Grupo());
            values.put(RegistroDB.AlimentosEntrada.PORCION, comidas.get(i).getMINAMOUNT());
            values.put(RegistroDB.AlimentosEntrada.PROTEINAS, comidas.get(i).getProteinas());
            values.put(RegistroDB.AlimentosEntrada.CARBOHIDRATOS, comidas.get(i).getCarbohidratos());
            values.put(RegistroDB.AlimentosEntrada.GRASAS, comidas.get(i).getGrasas());
            values.put(RegistroDB.AlimentosEntrada.URL, comidas.get(i).getUrl());

        }

        return values;
    }

    //Metodo para convertir la comida a un contentValue para posteriormente ser insertado en la base de datos de las comidas.
    public ContentValues toContentValuesComida() {

        ContentValues values = new ContentValues();

        for(int i = 0; i < comidas.size() ; i++){
            values.put(RegistroDB.RegistroEntrada.ID, comidas.get(i).getId());

            values.put(RegistroDB.RegistroEntrada.FECHA,fecha.toString());
            values.put(RegistroDB.RegistroEntrada.HORARIOCOMIDA, hora.toString());
            values.put(RegistroDB.RegistroEntrada.IDCOMIDA, comidas.get(i).getId());

        }

        return values;
    }
    */
}
