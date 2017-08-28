package com.example.sasu.asistente_nutricional_tfg_2017.utilidades;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.support.v4.app.NotificationCompat;

import com.example.sasu.asistente_nutricional_tfg_2017.R;

/**
 * Created by Sasu on 28/08/2017.
 */

public class WaterService extends Service {

    public static final int SERVICE_ID = 678987632;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {


        NotificationManager nm = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);

        Notification mBuilder =
                new Notification.Builder(this)
                        .setSmallIcon(R.mipmap.icono_inicio)
                        .setContentTitle("¿Tienes sed?")
                        .setContentText("Recuerda beber agua de vez en cuando. ¡Aunque no tengas sed!")
                        .build();

        nm.notify(5,mBuilder);

        return super.onStartCommand(intent, flags, startId);
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
