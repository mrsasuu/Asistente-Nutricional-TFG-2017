package com.example.sasu.asistente_nutricional_tfg_2017.models;

import android.content.ContentValues;

import com.example.sasu.asistente_nutricional_tfg_2017.database.Registro;
import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;
import com.orm.SugarRecord;

import java.util.ArrayList;
import java.util.Date;

import static android.R.attr.id;

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
            values.put(Registro.AlimentosEntrada.ID, alimentos.get(i).getId());

            values.put(Registro.AlimentosEntrada.NOMBRE, alimentos.get(i).getNombre());
            values.put(Registro.AlimentosEntrada.GRUPO, alimentos.get(i).getGrupo());
            values.put(Registro.AlimentosEntrada.SUB_GRUPO, alimentos.get(i).getSub_Grupo());
            values.put(Registro.AlimentosEntrada.PORCION, alimentos.get(i).getPorcion());
            values.put(Registro.AlimentosEntrada.PROTEINAS, alimentos.get(i).getProteinas());
            values.put(Registro.AlimentosEntrada.CARBOHIDRATOS, alimentos.get(i).getCarbohidratos());
            values.put(Registro.AlimentosEntrada.GRASAS, alimentos.get(i).getGrasas());
            values.put(Registro.AlimentosEntrada.URL, alimentos.get(i).getUrl());

        }

        return values;
    }

    //Metodo para convertir la comida a un contentValue para posteriormente ser insertado en la base de datos de las comidas.
    public ContentValues toContentValuesComida() {

        ContentValues values = new ContentValues();

        for(int i = 0; i < alimentos.size() ; i++){
            values.put(Registro.RegistroEntrada.ID, alimentos.get(i).getId());

            values.put(Registro.RegistroEntrada.FECHA,fecha.toString());
            values.put(Registro.RegistroEntrada.HORARIOCOMIDA, hora.toString());
            values.put(Registro.RegistroEntrada.IDCOMIDA, alimentos.get(i).getId());

        }

        return values;
    }
    */
}
