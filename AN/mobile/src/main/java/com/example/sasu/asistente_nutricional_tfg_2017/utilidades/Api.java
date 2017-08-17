package com.example.sasu.asistente_nutricional_tfg_2017.utilidades;



import com.example.sasu.asistente_nutricional_tfg_2017.models.Alimento;
import com.example.sasu.asistente_nutricional_tfg_2017.models.FoodRegistryBody;
import com.example.sasu.asistente_nutricional_tfg_2017.models.LoginBody;
import com.example.sasu.asistente_nutricional_tfg_2017.models.News;
import com.example.sasu.asistente_nutricional_tfg_2017.models.NewsBody;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Patient;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Registros;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Response;
import com.example.sasu.asistente_nutricional_tfg_2017.models.Row;


import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Path;
import retrofit2.http.GET;
import retrofit2.http.POST;


/**
 * REST service de SaludMock
 */

public interface Api {

    // TODO: Cambiar host por "10.0.3.2" para Genymotion.
    // TODO: Cambiar host por "10.0.2.2" para AVD.
    // TODO: Cambiar host por IP de tu PC para dispositivo real.
    public static final String BASE_URL = "http://mrsasuu.hopto.org/api/";

    @POST("patient/login")
    Call<Patient> login(@Body LoginBody loginBody);

    @POST("patient/news")
    Call<News> news(@Body NewsBody newsBody);

    @POST("food_register/week_number")
    Call<Row> numberRegisters(@Body FoodRegistryBody foodRegistryBody);

    @POST("food_register/sync")
    Call<Response> syncUpload(@Body Registros registros);

    /*@POST("food/count")
    Call<Row> foodCount(@Body Row rows);*/

    @GET("food/{route}")
    Call<Row> foodCount(@Path("route") String route);

    @POST("food_register/week_number/delete")
    Call<Response> deleteWeek(@Body NewsBody newsBody);

    @GET("food/{routes}")
    Call<List<Alimento>> food(@Path("routes") String routes);

}
