import { Schema } from "./lowDb/dbinterface"
export const data: Schema = {
      "users": [
            {
                  "name": "Tim",
                  "email": "tim@timtown.se",
                  "accountId": "1247",
                  "phoneNumber": "070000001",
                  "admin": false,
                  "password": "test"
            },
            {
                  "name": "Christian",
                  "email": "chris@christiania.se",
                  "accountId": "3467",
                  "phoneNumber": "070000002",
                  "admin": false,
                  "password": "test"
            },
            {
                  "name": "Julia",
                  "email": "julia@julle.se",
                  "accountId": "2349",
                  "phoneNumber": "070000003",
                  "admin": false,
                  "password": "test"
            },
            {
                  "name": "Ricky",
                  "email": "ricky@rickshaw.se",
                  "accountId": "4859",
                  "phoneNumber": "070000004",
                  "admin": true,
                  "password": "test"
            },
            {
                  "name": "Felix",
                  "email": "felix@basement.se",
                  "accountId": "0983",
                  "phoneNumber": "070000005",
                  "admin": false,
                  "password": "felle"
            }
      ],
      "orders": [
            {
              "cart": {
                "cartItems": [
                  {"name": "Fake", "price": 10, "amount": 2},
                  {"name": "Fake Igen", "price": 10, "amount": 3}
                ], 
                "totalPrice": 50
              },
              "user": { 
                "name": "Fake",
                "email": "Fake@fake.com",
                "phoneNumber": "0707891502",
                "accountId": "",
                "admin": false,
                "password": ""
              },
          
              "userComment": "",
              "adminComment": "",
              "locked": false,
              "completed": false,
              "orderPlaced": "2022-10-17 22:15",
              "orderCompleted": "2022-10-20 22:45",
              "id":"123asd"
            },
            {
              "cart": {
                "cartItems": [
                  {"name": "Påhittad", "price": 100, "amount": 1},
                  {"name": "Påhittad Igen", "price": 10, "amount": 3}
                ], 
                "totalPrice": 130
              },
              "user": { 
                "name": "Påhittad",
                "email": "Påhittad@fake.com",
                "phoneNumber": "0704502",
                "accountId": "",
                "admin": false,
                "password": ""
              },
          
              "userComment": "Jag har ont i magen",
              "adminComment": "",
              "locked": false,
              "completed": false,
              "orderPlaced": "2022-02-17 22:15",
              "orderCompleted": "2022-02-17 22:45",
              "id":"345zxc"
            },
            {
              "cart": {
                "cartItems": [
                  {"name": "Fake", "price": 10, "amount": 2},
                  {"name": "Fake Igen", "price": 10, "amount": 3}
                ], 
                "totalPrice": 50
              },
              "user": { 
                "name": "Fake",
                "email": "Fake@fake.com",
                "phoneNumber": "0707891502",
                "accountId": "",
                "admin": false,
                "password": ""
              },
          
              "userComment": "",
              "adminComment": "",
              "locked": false,
              "completed": false,
              "orderPlaced": "2022-10-17 22:15",
              "orderCompleted": "2022-10-17 22:45",
              "id":"123assad"
            },
            {
              "cart": {
                "cartItems": [
                  {"name": "Imaginary", "price": 100, "amount": 1},
                  {"name": "Imaginary Igen", "price": 10, "amount": 3},
                  {"name": "Något", "price": 10, "amount": 1},
                  {"name": "Något Igen", "price": 50, "amount": 1}
                ], 
                "totalPrice": 190
              },
              "user": { 
                "name": "Imaginary",
                "email": "Imaginary@fake.com",
                "accountId": "uaidy89hdaskd",
                "phoneNumber": "070423502",
                "admin": false,
                "password": ""
              },
          
              "userComment": "Tål inte saker",
              "adminComment": "Ge vatten bara",
              "locked": true,
              "completed": true,
              "orderPlaced": "2022-04-17 22:15",
              "orderCompleted": "2022-04-17 22:45",
              "id":"456zxcg"
            }
        ],
        "menu": [
            {
                  "name":"Vitlöksbröd",
                  "desc":"Härligt krispiga baguetter med vitlökssmör och tomater",
                  "allergies":"Laktos, Gluten",
                  "price": "99",
                  "type":"Förrätt"
            },
            {
                  "name":"Entrecôte m. klyftpotatis",
                  "desc":"Entrecôte stekt i smör och serverad med rödvinssås, klyftpotatis och grönsaker",
                  "allergies":"Gluten, Laktos",
                  "price": "599",
                  "type":"Kött"
            },
            {
                  "name":"Fiskpinnar och pulvermos",
                  "desc":"Frysta fiskpinnar stekt i en stekpanna. Serveras tillsammans med högkvalité pulvermos och citron på burk",
                  "allergies":"Fisk",
                  "price": "599",
                  "type":"Fisk"},
            {
                  "name":"Nudelwok med hoisin och broccoli",
                  "desc":"En fräsch vegowok med mycket grönsaker. Smaksättaren är hoisin, lime och sesamfrön. Rostad lök och solrosskott toppar det hela och binder ihop rätten på ett utsökt sätt",
                  "allergies":"",
                  "price": "199",
                  "type":"Veg"
            },
            {
                  "name" : "Oxfilé med Pommes",
                  "desc" : "Saftig prime cut av oxe, Serveras med schalottenlökar, Rödvinsås och Pommes ",
                  "allergies" : " Ägg, Laktos, Gluten",
                  "price" :  "699", 
                  "type" : "Kött"
            },
            {
                  "name":"Glass med nötter",
                  "desc":"Krämig gräddglass med hackade hasselnötter och chokladsås",
                  "allergies":"Laktos, Nötter",
                  "price": "199",
                  "type":"Efterrätt"
            },
            {
                  "name":"Citronstekt torsk med sesambakade grönsaker och krämig aioli",
                  "desc":"Finaste ryggfiléerna av torsk i syrlig och god citron/smörsås.",
                  "allergies":"Gluten, Laktos, Fisk, Sesamfrön",
                  "price": "349",
                  "type":"Fisk"
            },
            {
                  "name":"Affogato med rostade hasselnötter",
                  "desc":"goda rostade hasselnötter med vaniljglass, extra stark kaffe och lite socker, perfekt efter huvudrätten!",
                  "allergies":"Hasselnötter, Laktos",
                  "price": "599",
                  "type":"Efterätt"
            },
            {
                  "name":"Lemon curd med mandelfrags",
                  "desc":"Varva lemon curd, vaniljkräm och mandelfras i höga glas för en läcker och vacker efterrätt. Toppas med hallon och garneras med mynta.",
                  "allergies":"Mandel, Laktos",
                  "price": "599",
                  "type":"Efterätt"},
            {
                  "name":"Vaniljkräm med mango och passionsfrukt",
                  "desc":"Rårörd vaniljkräm med kesella och vispgrädde. Mango, passionsfrukt och vaniljkräm i fina glas och servera direkt.",
                  "allergies":"Laktos",
                  "price": "599",
                  "type":"Efterätt"
            },
            {
                  "name":"Grillad Harissa Kyckling",
                  "desc":"Grillade kyckling sticks med en örtig harissa och fänkolsyoghurt",
                  "allergies":"Laktos, Gluten",
                  "price": "399",
                  "type":"Fågel"
            },
            {
                  "name":"Medelhavskyckling med tabbouleh",
                  "desc":"Pannstekt medelhavskyckling med härlig tabbouleh och mild gräslöksdressing",
                  "allergies":"Gluten, Laktos",
                  "price": "389",
                  "type":"Fågel"},
            {
                  "name":"Chips med rom och citroncrème",
                  "desc":"Lyxig förrätt med chips, och citroncrème toppas av rom från Skagerak",
                  "allergies":"Laktos, Skaldjur",
                  "price":"215" , 
                  "type":"Förrätt" },
            {
                  "name":"Krispig pankoblomkål",
                  "desc":"Krispigt god pankoblomkål, serveras med vitlöksris och wokade grönsaker", 
                  "allergies":"Gluten",
                  "price": "349",
                  "type":"Veg"
            },
            {
                  "name":"Ostbricka",
                  "desc":"Fem av de finaste ostarna du kan tänka dig. Serveras med två olika marmelad.",
                  "allergies":"Laktos",
                  "price": "199",
                  "type":"Förrätt"
            },
            {
                  "name":"Toast Skagen",
                  "desc":"Två skivor rostat bröd med handskalade räkor ,skagenröra och citrongarnish" ,
                  "allergies":"Skaldjur, Gluten",
                  "price":"225" , 
                  "type":"Förrätt" },
            {
                  "name":"Grynsallad med tomater och bönröra",
                  "desc":"en tallrik som är både är en fröjd för ögat och för smaklökarna! En matig sallad gjord på matvete serveras här ihop med härliga smaker från fänkål och soltorkade tomater, som sedan binds ihop fint med den krämiga bönröran",
                  "allergies":"",
                  "price": "199",
                  "type":"Veg"
            },
            {
                  "name":"Krämig laxpasta",
                  "desc":"En härlig pastarätt med lax, zucchini och dill. Mild och god.",
                  "allergies":"Gluten, Laktos, Fisk",
                  "price": "349",
                  "type":"Fisk"
            },
            {
                  "name":"Black & White" ,
                  "desc":"Helstekt fläskfilé serveras med potatisgratäng, bearnaisesås och rödvinssky",
                  "allergies":"Laktos, ägg",
                  "price":"250" , 
                  "type":"Kött" 
            },
            {
                  "name":"Marulksgryta",
                  "desc":"Tillagas med grädde, räkor, rom och dill",
                  "allergies":"Laktos, skaldjur",
                  "price":"280",
                  "type":"Fisk"
            },
            {
                  "name":"Hot fudge brownie",
                  "desc":"Nybakad brownie serveras med vaniljglass, valnötter och varm kolasås",
                  "allergies":"Laktos, ägg, valnöt, gluten",
                  "price":"120",
                  "type":"Efterrätt"
            },
            {
                  "name":"Kryddiga grillost-tacos",
                  "desc":"Gyllene grillost i mjuka tortillas med stekta bönor och cajunmajonäs.",
                  "allergies":"Gluten, Laktos",
                  "price": "289",
                  "type":"Veg"
            }
      ]

}