package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;
import com.orm.SugarRecord;
import com.orm.dsl.Unique;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by Sasu on 06/06/2017.
 */

public class Comida extends SugarRecord{
    @Unique
    String fecha;
    Map<HorarioComida,List<Alimento>> comidas;




    public void registrarComidaHorario(HorarioComida h,Alimento al){
        if(comidas.containsKey(h)){
            List<Alimento> alimentos = comidas.get(h);
            alimentos.add(al);

            comidas.remove(h);
            comidas.put(h,alimentos);
        }
    }

    public Comida() {
    }

    /*
    //Metodo para convertir la comida a un contentValue para posteriormente ser insertado en la base de datos de las comidas.
    public ContentValues toContentValues() {
        //No implementado.

        ContentValues values = new ContentValues();

        for(int i = 0; i < comidas.size() ; i++){
            values.put(RegistroDB.AlimentosEntrada.ID, comidas.get(i).getId());

            values.put(RegistroDB.AlimentosEntrada.NOMBRE, comidas.get(i).getNombre());
            values.put(RegistroDB.AlimentosEntrada.GRUPO, comidas.get(i).getGrupo());
            values.put(RegistroDB.AlimentosEntrada.SUB_GRUPO, comidas.get(i).getSub_Grupo());
            values.put(RegistroDB.AlimentosEntrada.PORCION, comidas.get(i).getPorcion());
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
