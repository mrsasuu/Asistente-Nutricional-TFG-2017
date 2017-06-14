package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;
import com.orm.SugarRecord;

import java.util.ArrayList;
import java.util.Date;

/**
 * Created by Sasu on 06/06/2017.
 */

public class Comida extends SugarRecord{
    Date fecha;
    HorarioComida hora;
    ArrayList<Alimento> alimentos;

    /*
    //Metodo para convertir la comida a un contentValue para posteriormente ser insertado en la base de datos de las comidas.
    public ContentValues toContentValues() {
        //No implementado.

        ContentValues values = new ContentValues();

        for(int i = 0; i < alimentos.size() ; i++){
            values.put(RegistroDB.AlimentosEntrada.ID, alimentos.get(i).getId());

            values.put(RegistroDB.AlimentosEntrada.NOMBRE, alimentos.get(i).getNombre());
            values.put(RegistroDB.AlimentosEntrada.GRUPO, alimentos.get(i).getGrupo());
            values.put(RegistroDB.AlimentosEntrada.SUB_GRUPO, alimentos.get(i).getSub_Grupo());
            values.put(RegistroDB.AlimentosEntrada.PORCION, alimentos.get(i).getPorcion());
            values.put(RegistroDB.AlimentosEntrada.PROTEINAS, alimentos.get(i).getProteinas());
            values.put(RegistroDB.AlimentosEntrada.CARBOHIDRATOS, alimentos.get(i).getCarbohidratos());
            values.put(RegistroDB.AlimentosEntrada.GRASAS, alimentos.get(i).getGrasas());
            values.put(RegistroDB.AlimentosEntrada.URL, alimentos.get(i).getUrl());

        }

        return values;
    }

    //Metodo para convertir la comida a un contentValue para posteriormente ser insertado en la base de datos de las comidas.
    public ContentValues toContentValuesComida() {

        ContentValues values = new ContentValues();

        for(int i = 0; i < alimentos.size() ; i++){
            values.put(RegistroDB.RegistroEntrada.ID, alimentos.get(i).getId());

            values.put(RegistroDB.RegistroEntrada.FECHA,fecha.toString());
            values.put(RegistroDB.RegistroEntrada.HORARIOCOMIDA, hora.toString());
            values.put(RegistroDB.RegistroEntrada.IDCOMIDA, alimentos.get(i).getId());

        }

        return values;
    }
    */
}
