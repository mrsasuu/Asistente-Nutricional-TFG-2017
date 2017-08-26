package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.example.sasu.asistente_nutricional_tfg_2017.models.enumerados.HorarioComida;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.orm.SugarRecord;
import com.orm.dsl.Column;
import com.orm.dsl.Table;

/**
 * Created by Sasu on 17/06/2017.
 */
@Table(name = "Tabla")
public class Tabla extends SugarRecord{
    @SerializedName("fecha")
    @Expose
    @Column(name = "fecha")
    private String fecha;
    @SerializedName("horario")
    @Expose
    @Column(name = "horario")
    private String horario;
    @SerializedName("amount")
    @Expose
    @Column(name = "amount")
    private double amount;
    @SerializedName("idAlimento")
    @Expose
    @Column(name = "alim")
    private Long idAlimento;
    @SerializedName("CREATETIME")
    @Expose
    private Long CREATETIME;


    public Tabla() {
    }

    public Tabla(String fecha, String horario, Long idAlimento) {
        this.fecha = fecha;
        this.horario = horario;
        this.idAlimento = idAlimento;
    }

    public Tabla(String fecha, String horario, Long idAlimento, Long CREATETIME) {
        this.fecha = fecha;
        this.horario = horario;
        this.idAlimento = idAlimento;
        this.CREATETIME = CREATETIME;
    }

    public Tabla(String fecha, String horario, double amount, Long idAlimento, Long CREATETIME) {
        this.fecha = fecha;
        this.horario = horario;
        this.amount = amount;
        this.idAlimento = idAlimento;
        this.CREATETIME = CREATETIME;
    }

    public Long getCREATETIME() {
        return CREATETIME;
    }

    public void setCREATETIME(Long CREATETIME) {
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


    public String getHorario() {
        return horario;
    }

    public void setHorario(HorarioComida horario) {
        this.horario = horario.toString();
    }

    public void setHorario_comida(String horario_comida) {
        this.horario = horario_comida;
    }

    public Long getIdAlimento() {
        return idAlimento;
    }

    public void setIdAlimento(Long idAlimento) {
        this.idAlimento = idAlimento;
    }


}
