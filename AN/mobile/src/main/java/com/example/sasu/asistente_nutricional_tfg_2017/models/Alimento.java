package com.example.sasu.asistente_nutricional_tfg_2017.models;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.orm.SugarRecord;

import java.util.Date;

/**
 * Created by Sasu on 06/06/2017.
 */

public class Alimento extends SugarRecord{
    /*private Grupo grupo_alimentario;
    private SubGrupo categoria;*/


    //private Long id;
    @SerializedName("FOODID")
    @Expose
    private int FOODID;
    @SerializedName("NAME")
    @Expose
    private String NAME;
    @SerializedName("PHOTO")
    @Expose
    private String PHOTO;
    @SerializedName("MINPHOTO")
    @Expose
    private String MINPHOTO;
    @SerializedName("MEDPHOTO")
    @Expose
    private String MEDPHOTO;
    @SerializedName("MAXPHOTO")
    @Expose
    private String MAXPHOTO;
    @SerializedName("CREATETIME")
    @Expose
    private Date CREATETIME;
    @SerializedName("MINAMOUNT")
    @Expose
    private double MINAMOUNT;
    @SerializedName("MEDAMOUNT")
    @Expose
    private double MEDAMOUNT;
    @SerializedName("MAXAMOUNT")
    @Expose
    private double MAXAMOUNT;


    //PrioridadComida prioridad;


    public Alimento(int FOODID, String NAME, String PHOTO, String MINPHOTO, String MEDPHOTO, String MAXPHOTO, Date CREATETIME, double MINAMOUNT, double MEDAMOUNT, double MAXAMOUNT) {
        this.FOODID = FOODID;
        this.NAME = NAME;
        this.PHOTO = PHOTO;
        this.MINPHOTO = MINPHOTO;
        this.MEDPHOTO = MEDPHOTO;
        this.MAXPHOTO = MAXPHOTO;
        this.CREATETIME = CREATETIME;
        this.MINAMOUNT = MINAMOUNT;
        this.MEDAMOUNT = MEDAMOUNT;
        this.MAXAMOUNT = MAXAMOUNT;
    }



    public Alimento() {
    }

    public int getFOODID() {
        return FOODID;
    }

    public void setFOODID(int FOODID) {
        this.FOODID = FOODID;
    }

    public String getNAME() {
        return NAME;
    }

    public void setNAME(String NAME) {
        this.NAME = NAME;
    }

    public String getPHOTO() {
        return PHOTO;
    }

    public void setPHOTO(String PHOTO) {
        this.PHOTO = PHOTO;
    }

    public String getMINPHOTO() {
        return MINPHOTO;
    }

    public void setMINPHOTO(String MINPHOTO) {
        this.MINPHOTO = MINPHOTO;
    }

    public String getMEDPHOTO() {
        return MEDPHOTO;
    }

    public void setMEDPHOTO(String MEDPHOTO) {
        this.MEDPHOTO = MEDPHOTO;
    }

    public String getMAXPHOTO() {
        return MAXPHOTO;
    }

    public void setMAXPHOTO(String MAXPHOTO) {
        this.MAXPHOTO = MAXPHOTO;
    }

    public Date getCREATETIME() {
        return CREATETIME;
    }

    public void setCREATETIME(Date CREATETIME) {
        this.CREATETIME = CREATETIME;
    }

    public double getMINAMOUNT() {
        return MINAMOUNT;
    }

    public void setMINAMOUNT(double MINAMOUNT) {
        this.MINAMOUNT = MINAMOUNT;
    }

    public double getMEDAMOUNT() {
        return MEDAMOUNT;
    }

    public void setMEDAMOUNT(double MEDAMOUNT) {
        this.MEDAMOUNT = MEDAMOUNT;
    }

    public double getMAXAMOUNT() {
        return MAXAMOUNT;
    }

    public void setMAXAMOUNT(double MAXAMOUNT) {
        this.MAXAMOUNT = MAXAMOUNT;
    }

    /*
    public Grupo getGrupo_alimentario() {
        return grupo_alimentario;
    }

    public void setGrupo_alimentario(Grupo grupo_alimentario) {
        this.grupo_alimentario = grupo_alimentario;
    }

    public SubGrupo getCategoria() {
        return categoria;
    }

    public void setCategoria(SubGrupo categoria) {
        this.categoria = categoria;
    }

    public Date getCREATETIME() {
        return CREATETIME;
    }

    public void setCREATETIME(Date CREATETIME) {
        this.CREATETIME = CREATETIME;
    }

    public Long getIde() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNAME(String NAME) {
        this.NAME = NAME;
    }

    public String getPHOTO() {
        return PHOTO;
    }

    public void setPHOTO(String PHOTO) {
        this.PHOTO = PHOTO;
    }

    public void setMINAMOUNT(double MINAMOUNT) {
        this.MINAMOUNT = MINAMOUNT;
    }

    public void setProteinas(double proteinas) {
        this.proteinas = proteinas;
    }

    public void setCarbohidratos(double carbohidratos) {
        this.carbohidratos = carbohidratos;
    }

    public void setGrasas(double grasas) {
        this.grasas = grasas;
    }

    public Alimento(Long id, String NAME, String PHOTO, double MINAMOUNT, double proteinas, double carbohidratos, double grasas, Grupo grupo_alimentario, SubGrupo categoria){
        //this.id = id;
        this.NAME = NAME;
        this.PHOTO = PHOTO;
        this.MINAMOUNT = MINAMOUNT;
        this.proteinas = proteinas;
        this.carbohidratos = carbohidratos;
        this.grasas = grasas;
        this.grupo_alimentario = grupo_alimentario;
        this.categoria = categoria;
    }
    public Alimento(Long id, String NAME, String PHOTO, double MINAMOUNT, double proteinas, double carbohidratos, double grasas, Grupo grupo_alimentario, SubGrupo categoria, Date date){
        //this.id = id;
        this.NAME = NAME;
        this.PHOTO = PHOTO;
        this.MINAMOUNT = MINAMOUNT;
        this.proteinas = proteinas;
        this.carbohidratos = carbohidratos;
        this.grasas = grasas;
        this.grupo_alimentario = grupo_alimentario;
        this.categoria = categoria;
        this.CREATETIME = date;
    }

    public Alimento(String NAME)
    {
        this.NAME = NAME;
        this.CREATETIME = new Date();
    }


    public PrioridadComida getPrioridad(){
        return prioridad;
    }

    public void setPrioridad(PrioridadComida prioridad){
        this.prioridad = prioridad;
    }

    public String getNAME() {
        return NAME;
    }

    public Long getIdAl() {
        return id;
    }

    public String getGrupo() {
        return grupo_alimentario.toString();
    }

    public String getSub_Grupo() {
        return categoria.toString();
    }

    public double getMINAMOUNT() {
        return MINAMOUNT;
    }

    public double getProteinas() {
        return proteinas;
    }

    public double getCarbohidratos() {
        return carbohidratos;
    }

    public double getGrasas() {
        return grasas;
    }

    public String getUrl() {
        return PHOTO;
    }
*/
    //Micronutrientes como vitaminas, sales minerales
    //FALTA POR IMPLEMENTAR EL RESTO DE ELEMENTOS



}
