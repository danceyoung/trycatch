package com.trycatch;

import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;

public class GenError {
    static final Logger loger = LoggerFactory.getLogger(GenError.class);

    static final String TTF_ACCESS_TOKEN_PROPERTY = "ttf_access_token";
    static final String[] TTF_ACCESS_TOKEN_VALUES = {
            "ZGFuY2V5b3VuZ0Bob3RtYWlsLmNvbQ|VHJ5Q2F0Y2ggUHJvamVjdCBUZXN0WkdGdVkyVjViM1Z1WjBCb2IzUnRZV2xzTG1OdmJR",
            "bHVvc3VhbmRsdW9kYW5Ab3V0bG9vay5jb20|VHJ5Q2F0Y2ggUHJvamVjdCBUZXN0WkdGdVkyVjViM1Z1WjBCb2IzUnRZV2xzTG1OdmJR",
            "d3BnMTdAMTYzLmNvbQ|VHJ5Q2F0Y2ggUHJvamVjdCBUZXN0WkdGdVkyVjViM1Z1WjBCb2IzUnRZV2xzTG1OdmJR"
    };

    static final String TTF_LOG_TIMESTAMP_PROPERTY = "ttf_log_timestamp";

    public static void main(String args[]) {

        do {
            long intervalMillisec = ((int)(Math.random()*100) % 5) * 60 * 1000 ;
            try {
                Thread.sleep(intervalMillisec);

                int randomTokenValueIdx = ((int)(Math.random()*10)) % 3;
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty(TTF_ACCESS_TOKEN_PROPERTY, TTF_ACCESS_TOKEN_VALUES[randomTokenValueIdx]);
                jsonObject.addProperty(TTF_LOG_TIMESTAMP_PROPERTY, (new Date()).getTime()
                );
                Exception ex = new Exception(jsonObject.toString() + "Invalid pointer is performing a class instance method, check the pointer's runtime type. Invalid pointer is performing a class instance method, check the pointer's runtime type.Invalid pointer is performing a class instance method, check the pointer's runtime type.");
                throw ex;

            } catch (Exception e) {
                e.printStackTrace();
                loger.error(e.getLocalizedMessage());
            }
        } while (true);

    }
}
