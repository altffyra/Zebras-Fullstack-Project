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
        },
        {
              "name": "David",
              "email": "david@basement.se",
              "accountId": "0981",
              "phoneNumber": "070000006",
              "admin": true,
              "password": "davve"
        }
      ],
      "orders": [
        {
          "cart": {
            "cartItems": [
              {
                "name": "Vitlöksbröd",
                "price": 39,
                "amount": 1
              },
              {
                "name": "Marulksgryta",
                "price": 200,
                "amount": 1
              },
              {
                "name": "Krispig pankoblomkål",
                "price": 109,
                "amount": 1
              }
            ],
            "totalPrice": 348
          },
          "user": {
            "name": "Felix",
            "email": "felix@basement.se",
            "accountId": "0983",
            "phoneNumber": "070000005",
            "admin": false,
            "password": "felle"
          },
          "userComment": "Ingen vitlök",
          "locked": false,
          "completed": false,
          "orderPlaced": "2022-10-28 10:05",
          "orderCompleted": "2022-10-28 10:10",
          "id": "CXZSJADRME"
        },
        {
          "cart": {
            "cartItems": [
              {
                "name": "Toast Skagen",
                "price": 142,
                "amount": 2
              },
              {
                "name": "Krämig laxpasta",
                "price": 129,
                "amount": 1
              },
              {
                "name": "Hot fudge brownie",
                "price": 69,
                "amount": 1
              }
            ],
            "totalPrice": 482
          },
          "user": {
            "name": "Jens Andersson",
            "email": "jens@helloworld.com",
            "phoneNumber": "0500655565",
            "accountId": "",
            "password": ""
          },
          "userComment": "",
          "locked": false,
          "completed": false,
          "orderPlaced": "2022-10-28 10:05",
          "orderCompleted": "2022-10-28 10:38",
          "id": "XSHEDOKQTP"
        },
        {
          "cart": {
            "cartItems": [
              {
                "name": "Grillad Harissa Kyckling",
                "price": 149,
                "amount": 2
              },
              {
                "name": "Kryddiga grillost-tacos",
                "price": 179,
                "amount": 1
              }
            ],
            "totalPrice": 477
          },
          "user": {
            "name": "Pelle Jönsson",
            "email": "pelle@pello.com",
            "phoneNumber": "082652356",
            "accountId": "guest",
            "password": ""
          },
          "userComment": "",
          "locked": false,
          "completed": false,
          "orderPlaced": "2022-10-28 10:05",
          "orderCompleted": "2022-10-28 10:22",
          "id": "EUJXOZHNQY"
        },
        {
          "cart": {
            "cartItems": [
              {
                "name": "Nudelwok med hoisin och broccoli",
                "price": 99,
                "amount": 2
              },
              {
                "name": "Glass med nötter",
                "price": 79,
                "amount": 1
              },
              {
                "name": "Lemon curd med mandelfrags",
                "price": 89,
                "amount": 1
              }
            ],
            "totalPrice": 366
          },
          "user": {
            "name": "Julia",
            "email": "julia@julle.se",
            "phoneNumber": "085465444",
            "accountId": "guest",
            "password": ""
          },
          "userComment": "",
          "locked": false,
          "completed": false,
          "orderPlaced": "2022-10-28 10:05",
          "orderCompleted": "2022-10-28 10:37",
          "id": "IOFRICHLFE"
        },
        {
          "cart": {
            "cartItems": [
              {
                "name": "Hot fudge brownie",
                "price": 69,
                "amount": 4
              }
            ],
            "totalPrice": 276
          },
          "user": {
            "name": "Maja Majasson",
            "email": "maja@maj.com",
            "phoneNumber": "0805456224",
            "accountId": "guest",
            "password": ""
          },
          "userComment": "",
          "locked": false,
          "completed": false,
          "orderPlaced": "2022-10-28 10:05",
          "orderCompleted": "2022-10-28 10:41",
          "id": "MNPDHBBDHN"
        }
      ],
      "menu": [
        {
          "name": "Vitlöksbröd",
          "desc": "Härligt krispiga baguetter med vitlökssmör och tomater.",
          "allergies": "Laktos, Gluten",
          "price": 39,
          "type": "Förrätt"
        },
        {
          "name": "Entrecôte m. klyftpotatis",
          "desc": "Entrecôte stekt i smör och serverad med rödvinssås, klyftpotatis och grönsaker.",
          "allergies": "Gluten, Laktos",
          "price": 139,
          "type": "Kött"
        },
        {
          "name": "Fiskpinnar och pulvermos",
          "desc": "Frysta fiskpinnar stekt i en stekpanna. Serveras tillsammans med högkvalité pulvermos och citron på burk.",
          "allergies": "Fisk",
          "price": 109,
          "type": "Fisk"
        },
        {
          "name": "Nudelwok med hoisin och broccoli",
          "desc": "En fräsch vegowok med mycket grönsaker. Smaksättaren är hoisin, lime och sesamfrön. Rostad lök och solrosskott toppar det hela och binder ihop rätten på ett utsökt sätt.",
          "allergies": "",
          "price": 99,
          "type": "Veg"
        },
        {
          "name": "Oxfilé med pommes",
          "desc": "Saftig prime cut av oxe. Serveras med schalottenlökar, rödvinsås och pommes.",
          "allergies": " Ägg, Laktos, Gluten",
          "price": 199,
          "type": "Kött"
        },
        {
          "name": "Glass med nötter",
          "desc": "Krämig gräddglass med hackade hasselnötter och chokladsås.",
          "allergies": "Laktos, Nötter",
          "price": 79,
          "type": "Efterrätt"
        },
        {
          "name": "Citronstekt torskrygg",
          "desc": "Finaste ryggfiléerna av torsk med sesambakade grönsaker och krämig aioli. Syrlig och god citron/smörsås.",
          "allergies": "Gluten, Laktos, Fisk, Sesamfrön",
          "price": 139,
          "type": "Fisk"
        },
        {
          "name": "Affogato med rostade hasselnötter",
          "desc": "Goda rostade hasselnötter med vaniljglass, extra stark kaffe och lite socker, perfekt efter huvudrätten!",
          "allergies": "Hasselnötter, Laktos",
          "price": 78,
          "type": "Efterrätt"
        },
        {
          "name": "Lemon curd med mandelfras",
          "desc": "Varva lemon curd, vaniljkräm och mandelfras i höga glas för en läcker och vacker efterrätt. Toppas med hallon och garneras med mynta.",
          "allergies": "Nötter, Laktos",
          "price": 89,
          "type": "Efterrätt"
        },
        {
          "name": "Vaniljkräm med mango och passionsfrukt",
          "desc": "Rårörd vaniljkräm med kesella och vispgrädde. Mango, passionsfrukt och vaniljkräm i fina glas och servera direkt.",
          "allergies": "Laktos",
          "price": 68,
          "type": "Efterrätt"
        },
        {
          "name": "Grillad Harissa Kyckling",
          "desc": "Grillade kyckling sticks med en örtig harissa och fänkolsyoghurt.",
          "allergies": "Laktos, Gluten",
          "price": 149,
          "type": "Fågel"
        },
        {
          "name": "Medelhavskyckling med tabbouleh",
          "desc": "Pannstekt medelhavskyckling med härlig tabbouleh och mild gräslöksdressing.",
          "allergies": "Gluten, Laktos",
          "price": 209,
          "type": "Fågel"
        },
        {
          "name": "Chips med rom och citroncrème",
          "desc": "Lyxig förrätt med chips, och citroncrème toppas av rom från Skagerak.",
          "allergies": "Laktos, Skaldjur",
          "price": 79,
          "type": "Förrätt"
        },
        {
          "name": "Krispig pankoblomkål",
          "desc": "Krispigt god pankoblomkål, serveras med vitlöksris och wokade grönsaker.",
          "allergies": "Gluten",
          "price": 109,
          "type": "Veg"
        },
        {
          "name": "Ostbricka",
          "desc": "Fem av de finaste ostarna du kan tänka dig. Serveras med två olika marmelad.",
          "allergies": "Laktos",
          "price": 109,
          "type": "Förrätt"
        },
        {
          "name": "Toast Skagen",
          "desc": "Två skivor rostat bröd med handskalade räkor, skagenröra och citrongarnish.",
          "allergies": "Skaldjur, Gluten",
          "price": 142,
          "type": "Förrätt"
        },
        {
          "name": "Grynsallad med tomater och bönröra",
          "desc": "En tallrik som är både är en fröjd för ögat och för smaklökarna! En matig sallad gjord på matvete serveras här ihop med härliga smaker från fänkål och soltorkade tomater.",
          "allergies": "",
          "price": 139,
          "type": "Veg"
        },
        {
          "name": "Krämig laxpasta",
          "desc": "En härlig pastarätt med lax, zucchini och dill. Mild och god.",
          "allergies": "Gluten, Laktos, Fisk",
          "price": 129,
          "type": "Fisk"
        },
        {
          "name": "Black & White",
          "desc": "Helstekt fläskfilé serveras med potatisgratäng, bearnaisesås och rödvinssky.",
          "allergies": "Laktos, ägg",
          "price": 215,
          "type": "Kött"
        },
        {
          "name": "Marulksgryta",
          "desc": "Smaka på havets läckerheter! Tillagas med grädde, räkor, rom och dill.",
          "allergies": "Laktos, skaldjur",
          "price": 200,
          "type": "Fisk"
        },
        {
          "name": "Hot fudge brownie",
          "desc": "Nybakad brownie serveras med vaniljglass, valnötter och varm kolasås.",
          "allergies": "Laktos, ägg, valnöt, gluten",
          "price": 69,
          "type": "Efterrätt"
        },
        {
          "name": "Kryddiga grillost-tacos",
          "desc": "Gyllene grillost i mjuka tortillas med stekta bönor och cajunmajonäs.",
          "allergies": "Gluten, Laktos",
          "price": 179,
          "type": "Veg"
        }
      ]
    }