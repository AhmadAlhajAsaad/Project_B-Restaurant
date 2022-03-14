using System;

namespace Project_B_week_4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //test
            string menu = "\nHoofdmenu optie hebben:\n\n1- Reserveren. \n2- Menu kaart zien.\n3- Algemene informatie tonen.\nKlik op een ster om terug naar het hoofdmenu.";

            Startpoint: Console.WriteLine("Welkom bij ons restaurant reserveringssesteem!\n");
            Console.WriteLine("1- Inlogen. \n2- Doorgaan als gast. \n3- Registeren.\n4- Informatie.\n\n-Voer een van de bovenstaande nummers in: \n ");


            string Start;
            Start = Console.ReadLine();

            if (Start == "1")
            {
           
                Console.Clear();
                Console.WriteLine("Voer de gebruikersnaam in: \n");
                Console.ReadLine();
                Console.WriteLine("\nVoer het wachtwoord in: \n ");
                Console.ReadLine();
                Console.WriteLine(menu);
                string gostart = Console.ReadLine();
                if (gostart == "*")
                {
                    Console.Clear();
                    goto Startpoint;
                }
                else { Console.WriteLine("Klik op een ster om terug naar het hoofdmenu."); }
            } else if (Start == "2")
            {
                Console.Clear();
                Console.WriteLine("Verder zonder account\n" + menu);
                string gostart = Console.ReadLine();
                if (gostart == "*")
                {
                    Console.Clear();
                    goto Startpoint;
                }
                else { Console.WriteLine("Klik op een ster om terug naar het hoofdmenu."); }
            }
            else if (Start == "3")
            {
                Console.Clear();
                Console.WriteLine("Registeren: \n-Voer uw Voornaam in: ");
                Console.ReadLine();
                Console.WriteLine("Voer uw achter naam: ");
                Console.ReadLine();
                Console.WriteLine("Voer uw emailadres in: ");
                Console.ReadLine();
                Console.WriteLine("Wachtwoord invoeren: ");
                Console.ReadLine();
                Console.WriteLine("Leeftijd invoeren: ");
                Console.ReadLine();
                Console.WriteLine(menu);
                string gostart = Console.ReadLine();
                if (gostart == "*")
                {
                    Console.Clear();
                    goto Startpoint;
                }
                else { Console.WriteLine("\nKlik op een ster om terug naar het hoofdmenu."); }

            }
            else if (Start == "4")
            {
                Console.Clear(); ;
                Console.WriteLine("Openingstijden: maandag t/m vrijdag 10:00-22:00. \nweekend 12:00-24:00\n\nContact: telefoonnummer; 070 34 24818.\n\nAdres: Wijnhaven 107, 8518KA, Rotterdam \n\nKlik op een ster om terug naar het hoofdmenu\n");
                string gostart = Console.ReadLine();
                if (gostart == "*")
                {
                    Console.Clear();
                    goto Startpoint;
                }
                else { Console.WriteLine("Klik op een ster om terug naar het hoofdmenu."); }

            }

        }

    }
}
