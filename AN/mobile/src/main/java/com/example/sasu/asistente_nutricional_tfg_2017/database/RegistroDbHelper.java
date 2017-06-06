package com.example.sasu.asistente_nutricional_tfg_2017.database;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.sasu.asistente_nutricional_tfg_2017.models.Comida;

/**
 * Created by Sasu on 06/06/2017.
 */

public class RegistroDbHelper extends SQLiteOpenHelper {
    public static final int DATABASE_VERSION = 1;
    public static final String DATABASE_NAME = "Registro.db";

    public RegistroDbHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }


    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        sqLiteDatabase.execSQL("CREATE TABLE " + Registro.AlimentosEntrada.TABLE_NAME + " ("
                + Registro.AlimentosEntrada._ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
                + Registro.AlimentosEntrada.ID + " TEXT NOT NULL,"
                + Registro.AlimentosEntrada.NOMBRE + " TEXT NOT NULL,"
                + Registro.AlimentosEntrada.GRUPO + " TEXT NOT NULL,"
                + Registro.AlimentosEntrada.SUB_GRUPO + " TEXT NOT NULL,"
                + Registro.AlimentosEntrada.PORCION + " TEXT NOT NULL,"
                + Registro.AlimentosEntrada.PROTEINAS + " TEXT NOT NULL,"
                + Registro.AlimentosEntrada.CARBOHIDRATOS + " TEXT NOT NULL,"
                + Registro.AlimentosEntrada.GRASAS + " TEXT NOT NULL,"
                + Registro.AlimentosEntrada.URL + " TEXT,"
                + "UNIQUE (" + Registro.AlimentosEntrada.ID + "))");

        sqLiteDatabase.execSQL("CREATE TABLE " + Registro.RegistroEntrada.TABLE_NAME + " ("
                + Registro.RegistroEntrada._ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
                + Registro.RegistroEntrada.ID + " TEXT NOT NULL,"
                + Registro.RegistroEntrada.FECHA + " DATE NOT NULL,"
                + Registro.RegistroEntrada.HORARIOCOMIDA + " TEXT NOT NULL,"
                + Registro.RegistroEntrada.IDCOMIDA + " TEXT NOT NULL,"
                + "UNIQUE (" + Registro.RegistroEntrada.ID + "))");


    }

    public long anotarComida(Comida comida) {
        SQLiteDatabase sqLiteDatabase = getWritableDatabase();

        return sqLiteDatabase.insert(
                Registro.AlimentosEntrada.TABLE_NAME,
                null,
                comida.toContentValuesComida());

    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }
}
