package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.orm.SugarRecord;
import com.orm.dsl.Column;
import com.orm.dsl.Table;

import java.util.Date;

/**
 * Created by Sasu on 17/06/2017.
 */
@Table(name = "Tabla")
public class Tabla extends SugarRecord{
    @Column(name = "fecha")
    private String fecha;
    @Column(name = "horario")
    private String horario_comida;
    @Column(name = "amount")
    private double amount;
    @Column(name = "alim")
    private Long id_alimento;
    @SerializedName("CREATETIME")
    @Expose
    private String CREATETIME;


    public Tabla() {
    }

    public Tabla(String fecha, String horario_comida, Long id_alimento) {
        this.fecha = fecha;
        this.horario_comida = horario_comida;
        this.id_alimento = id_alimento;
    }

    public Tabla(String fecha, String horario_comida, Long id_alimento, String CREATETIME) {
        this.fecha = fecha;
        this.horario_comida = horario_comida;
        this.id_alimento = id_alimento;
        this.CREATETIME = CREATETIME;
    }

    public Tabla(String fecha, String horario_comida, double amount, Long id_alimento, String CREATETIME) {
        this.fecha = fecha;
        this.horario_comida = horario_comida;
        this.amount = amount;
        this.id_alimento = id_alimento;
        this.CREATETIME = CREATETIME;
    }

    public String getCREATETIME() {
        return CREATETIME;
    }

    public void setCREATETIME(String CREATETIME) {
        this.CREATETIME = CREATETIME;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }


    public String getHorario_comida() {
        return horario_comida;
    }

    public void setHorario_comida(HorarioComida horario_comida) {
        this.horario_comida = horario_comida.toString();
    }

    public void setHorario_comida(String horario_comida) {
        this.horario_comida = horario_comida;
    }

    public Long getId_alimento() {
        return id_alimento;
    }

    public void setId_alimento(Long id_alimento) {
        this.id_alimento = id_alimento;
    }


}
