package com.example.sasu.asistente_nutricional_tfg_2017.database;

import android.provider.BaseColumns;

/**
 * Created by Sasu on 06/06/2017.
 */

public class Registro {

    public abstract class AlimentosEntrada implements BaseColumns{
        public static final String TABLE_NAME = "alimentos";

        public static final String ID = "id";
        public static final String NOMBRE = "nombre";
        public static final String GRUPO = "grupo";
        public static final String SUB_GRUPO = "sub_grupo";
        public static final String PORCION = "porcion";
        public static final String PROTEINAS = "proteinas";
        public static final String CARBOHIDRATOS = "carbohidratos";
        public static final String GRASAS = "grasas";
        public static final String URL = "url";


    }

    public abstract class RegistroEntrada implements BaseColumns{
        public static final String TABLE_NAME = "registro";

        public static final String ID = "id";
        public static final String FECHA = "fecha";
        public static final String HORARIOCOMIDA = "horariocomida";
        public static final String IDCOMIDA = "idcomida";



    }
}
