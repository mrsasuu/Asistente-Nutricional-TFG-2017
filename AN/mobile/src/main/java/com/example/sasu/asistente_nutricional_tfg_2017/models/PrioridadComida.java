package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;
import com.orm.SugarRecord;

import java.util.ArrayList;

/**
 * Created by mrsas on 08/06/2017.
 */

public class PrioridadComida extends SugarRecord {
    int prioridad;
    ArrayList<HorarioComida> horarioComidas;
}
