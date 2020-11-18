using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_Angularjs.Models
{
    public static class DbSeeder
    {
        public static void Seed(VehicleDbContext db)
        {
            Vehicle v = new Vehicle {
                MakeBy = "BMW",
                Color = "Red",
                Condition = "Good",
                IsHold = true,
                MakeDate = DateTime.Parse("01/01/2015"),
                Mileage = 500,
                VINNumber = "SER4562012",
                Note = "Racing car." };
            v.ServiceRecord.Add(new ServiceRecord { ServiceBy = "Jamal Uddin", ServiceCharge = 1200.00M, IsDelivered = true, ConditionDescr = "Fully recobered." });
            v.ServiceRecord.Add(new ServiceRecord { ServiceBy = "Shihab Sheikh", ServiceCharge = 1100.00M, IsDelivered = false, ConditionDescr = "Fully recobered." });
            db.Vehicles.Add(v);
            Vehicle v1 = new Vehicle
            {
                MakeBy = "Ferrari",
                Color = "Blue",
                Condition = "Good",
                IsHold = true,
                MakeDate = DateTime.Parse("03/05/2011"),
                Mileage = 900,
                VINNumber = "FRT2016R20",
                Note = "Racing car."
            };
            v1.ServiceRecord.Add(new ServiceRecord { ServiceBy = "Ali Ahsan", ServiceCharge = 1500.00M, IsDelivered = true, ConditionDescr = "Fully recobered." });
            v1.ServiceRecord.Add(new ServiceRecord { ServiceBy = "Shakib Jamal", ServiceCharge = 1300.00M, IsDelivered = false, ConditionDescr = "Fully recobered." });
            db.Vehicles.Add(v1);
            db.SaveChanges();

        }
    }
}
