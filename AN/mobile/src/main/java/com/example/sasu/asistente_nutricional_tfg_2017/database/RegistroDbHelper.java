package com.example.sasu.asistente_nutricional_tfg_2017.database;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import com.example.sasu.asistente_nutricional_tfg_2017.models.Comida;

/**
 * Created by Sasu on 06/06/2017.
 */

//Por ahor ano se usará ya que utilizaremos ORM SUGAR

public class RegistroDbHelper {//extends SQLiteOpenHelper {
 /*   public static final int DATABASE_VERSION = 1;
    public static final String DATABASE_NAME = "RegistroDB.db";

    public RegistroDbHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }


    @Override
    public void onCreate(SQLiteDatabase sqLiteDatabase) {
        sqLiteDatabase.execSQL("CREATE TABLE " + RegistroDB.AlimentosEntrada.TABLE_NAME + " ("
                + RegistroDB.AlimentosEntrada._ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
                + RegistroDB.AlimentosEntrada.ID + " TEXT NOT NULL,"
                + RegistroDB.AlimentosEntrada.NOMBRE + " TEXT NOT NULL,"
                + RegistroDB.AlimentosEntrada.GRUPO + " TEXT NOT NULL,"
                + RegistroDB.AlimentosEntrada.SUB_GRUPO + " TEXT NOT NULL,"
                + RegistroDB.AlimentosEntrada.PORCION + " TEXT NOT NULL,"
                + RegistroDB.AlimentosEntrada.PROTEINAS + " TEXT NOT NULL,"
                + RegistroDB.AlimentosEntrada.CARBOHIDRATOS + " TEXT NOT NULL,"
                + RegistroDB.AlimentosEntrada.GRASAS + " TEXT NOT NULL,"
                + RegistroDB.AlimentosEntrada.URL + " TEXT,"
                + "UNIQUE (" + RegistroDB.AlimentosEntrada.ID + "))");

        sqLiteDatabase.execSQL("CREATE TABLE " + RegistroDB.RegistroEntrada.TABLE_NAME + " ("
                + RegistroDB.RegistroEntrada._ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
                + RegistroDB.RegistroEntrada.ID + " TEXT NOT NULL,"
                + RegistroDB.RegistroEntrada.FECHA + " DATE NOT NULL,"
                + RegistroDB.RegistroEntrada.HORARIOCOMIDA + " TEXT NOT NULL,"
                + RegistroDB.RegistroEntrada.IDCOMIDA + " TEXT NOT NULL,"
                + "UNIQUE (" + RegistroDB.RegistroEntrada.ID + "))");


    }

    public long anotarComida(Comida comida) {
        SQLiteDatabase sqLiteDatabase = getWritableDatabase();

        return sqLiteDatabase.insert(
                RegistroDB.AlimentosEntrada.TABLE_NAME,
                null,
                comida.toContentValuesComida());

    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {

    }*/
}
