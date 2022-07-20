package com.example.demo;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Utils {

    public JSONObject JSONsFromCSV(String fileName){

        List<String[]> lines = new ArrayList<>();
        Resource resource = new ClassPathResource(fileName);
        JSONObject jos = new JSONObject();

        try (CSVReader csvReader = new CSVReader(new FileReader(resource.getFile()));) {
            String[] line = null;

            //csvReader.readNext() citeste urm linie
            while ((line = csvReader.readNext()) != null) {
                JSONObject jo = new JSONObject();

                jo.put("timeStamp", LocalDateTime.now());
                jo.put("value", line[0]);
                jo.put("sensorID", "69");

                String str = jo.toString();
                System.out.println(str);

            }
        }catch (IOException | CsvValidationException e) {
            e.printStackTrace();
        }
    }


}
