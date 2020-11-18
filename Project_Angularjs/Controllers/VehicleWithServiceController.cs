using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_Angularjs.Models;

namespace Project_Angularjs.Controllers
{
    //controller VehicleWithService
    [Produces("application/json")]
    public class VehicleWithServiceController : Controller
    {
        VehicleDbContext db;
        public VehicleWithServiceController(VehicleDbContext db) { this.db = db; }
        public IActionResult Index()
        {
            return View();
        }
        // VehicleWithService/VehicleWithService
        [HttpGet]
        public IActionResult VehicleWithService()
        {
            var data = db.Vehicles.Include(x => x.ServiceRecord).ToList();

            return Json(data);

        }
        // VehicleWithService/Insert
        [HttpPost]
        public IActionResult Insert([FromBody]Vehicle v)
        {
            db.Vehicles.Add(v);
            db.SaveChanges();
            return Json(v);
        }
        // VehicleWithService/Update
        [HttpPut]
        public IActionResult Update(int id, [FromBody]Vehicle v)
        {
            var org = db.Vehicles.Include(x => x.ServiceRecord).First(x => x.VehicleId == v.VehicleId);
            org.MakeBy = v.MakeBy;
            org.Color = v.Color;
            org.Condition = v.Condition;
            org.MakeDate = v.MakeDate;
            org.Mileage = v.Mileage;
            org.VINNumber = v.VINNumber;
            org.IsHold = v.IsHold;
            org.Note = v.Note;
            if (v.ServiceRecord != null && v.ServiceRecord.Count > 0)
            {
                var service = v.ServiceRecord.ToArray();
                for (var i = 0; i < service.Length; i++)
                {
                    var temp = org.ServiceRecord.FirstOrDefault(y => y.ServiceRecordId == service[i].ServiceRecordId);
                    if (temp != null)
                    {
                        temp.ServiceBy = service[i].ServiceBy;
                        temp.ServiceCharge = service[i].ServiceCharge;
                        temp.ConditionDescr = service[i].ConditionDescr;
                        temp.IsDelivered = service[i].IsDelivered;
                    }
                    else
                    {
                        org.ServiceRecord.Add(service[i]);
                    }
                }
                service = org.ServiceRecord.ToArray();
                for (var i = 0; i < service.Length; i++)
                {
                    var tmp = v.ServiceRecord.FirstOrDefault(j => j.ServiceRecordId == service[i].ServiceRecordId);
                    if (tmp == null)
                        db.Entry(service[i]).State = EntityState.Deleted;
                }
            }
            db.SaveChanges();

            return Json(v);
        }
        // VehicleWithService/Delete
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var original = db.Vehicles.First(x => x.VehicleId == id);
            db.Remove(original);
            db.SaveChanges();
            return Json(original);
        }
        // VehicleWithService/GetVehicleById
        [HttpGet]
        public IActionResult GetVehicleById(int id)
        {
            return Ok(db.Vehicles
                    .Include(x => x.ServiceRecord)
                    .FirstOrDefault(x => x.VehicleId == id));
        }

        // VehicleWithService/InsertService
        [HttpPost]
        public IActionResult InsertService([FromBody]ServiceRecord s)
        {
            db.ServiceRecords.Add(s);
            db.SaveChanges();
            return Json(s);
        }
        // VehicleWithService/UpdateService
        [HttpPut]
        public IActionResult UpdateService(int id, [FromBody] ServiceRecord s)
        {
            var original = db.ServiceRecords.First(x => x.ServiceRecordId == id);
            original.ServiceBy = s.ServiceBy;
            original.ServiceCharge = s.ServiceCharge;
            original.ConditionDescr = s.ConditionDescr;
            original.IsDelivered = s.IsDelivered;
            db.SaveChanges();
            return Json(s);
        }
        //VehicleWithService/DeleteService
        [HttpDelete]
        public IActionResult DeleteService(int id)
        {
            var original = db.ServiceRecords.First(x => x.ServiceRecordId == id);
            db.Remove(original);
            db.SaveChanges();
            return Json(original);
        }
        //VehicleWithService/GetVehicleDpwn
        [HttpGet]
        public IActionResult GetVehicleDpwn()
        {
            return Json(db.Vehicles.ToList());
        }
        //VehicleWithService/GetServiceById
        [HttpGet]
        public IActionResult GetServiceById(int id)
        {
            return Ok(db.ServiceRecords
                    .FirstOrDefault(x => x.ServiceRecordId == id));
        }
        //VehicleWithService/GetServices
        [HttpGet]
        public IActionResult GetServices()
        {
            var data = db.ServiceRecords.ToList();
            return Json(data);
        }
    }
}