package com.example.sasu.asistente_nutricional_tfg_2017.utilidades;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import java.util.Calendar;

/**
 * Created by Sasu on 27/08/2017.
 */

public class BootService extends BroadcastReceiver{

    @Override
    public void onReceive(Context context, Intent intent) {
        if(intent.getAction().equals(Intent.ACTION_BOOT_COMPLETED)){

            Context ctx = context;
/** this gives us the time for the first trigger.  */
            Calendar cal = Calendar.getInstance();
            AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
            //long interval = 1000 * 5; // 5 minutes in milliseconds

            long interval = 1000 * 60 * 60 * 3; // intervalo de 3 horas
            Intent serviceIntent = new Intent(ctx, UpdateController.class);
// make sure you **don't** use *PendingIntent.getBroadcast*, it wouldn't work
            PendingIntent servicePendingIntent =
                    PendingIntent.getService(ctx,
                            UpdateController.SERVICE_ID, // integer constant used to identify the service
                            serviceIntent,
                            PendingIntent.FLAG_CANCEL_CURRENT);  // FLAG to avoid creating a second service if there's already one running
// there are other options like setInexactRepeating, check the docs
            am.setRepeating(
                    AlarmManager.RTC_WAKEUP,//type of alarm. This one will wake up the device when it goes off, but there are others, check the docs
                    cal.getTimeInMillis(),
                    interval,
                    servicePendingIntent
            );
        }
    }
}
