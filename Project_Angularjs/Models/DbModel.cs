using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project_Angularjs.Models
{
    public class Vehicle
    {
        public Vehicle()
        {
            this.ServiceRecord = new List<ServiceRecord>();
        }
        [Display(Name = "Vehicle Id")]
        public int VehicleId { get; set; }

        [Required(ErrorMessage = "Make By required,"), StringLength(40), Display(Name = "Make By")]
        public string MakeBy { get; set; }
        [StringLength(40), Display(Name = "Color")]
        public string Color { get; set; }
        [StringLength(40), Display(Name = "Condition")]
        public string Condition { get; set; }
        [Required(ErrorMessage = "Make date is required."), Display(Name = "Make Date")]
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime MakeDate { get; set; }
        [Required(ErrorMessage = "Mileage is required,"), Display(Name = "Mileage")]
        public int Mileage { get; set; }
        [Required(ErrorMessage = "VIN number is required,"), StringLength(40), Display(Name = "VIN Number")]
        public string VINNumber { get; set; }
        [Display(Name = "Is Hold?")]
        public bool IsHold { get; set; }
        [StringLength(200), Display(Name = "Note")]
        public string Note { get; set; }
        //
        public virtual ICollection<ServiceRecord> ServiceRecord { get; set; }

    }
    public class ServiceRecord
    {
        [Display(Name = "Service Record Id")]
        public int ServiceRecordId { get; set; }
        [Required(ErrorMessage = "Service by is required,"), StringLength(40), Display(Name = "Service By")]
        public string ServiceBy { get; set; }
        [Required(ErrorMessage = "Service charge is required."), Column(TypeName = "money"), DisplayFormat(DataFormatString = "{0:0.00}", ApplyFormatInEditMode = true)]
        [Display(Name = "Service Charge")]
        public decimal ServiceCharge { get; set; }

        [StringLength(200), Display(Name = "Condition Description")]
        public string ConditionDescr { get; set; }
        [Display(Name = "Is Delivered?")]
        public bool IsDelivered { get; set; }
        //
        [Display(Name = "Vehicle Id")]
        public int VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public virtual Vehicle Vehicle { get; set; }
    }
    public class VehicleDbContext : DbContext
    {
        public VehicleDbContext(DbContextOptions<VehicleDbContext> options):base(options)
        {
            //this.Configuration.LazyLoadingEnabled = false;
            //this.Configuration.ProxyCreationEnabled = false;
        }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<ServiceRecord> ServiceRecords { get; set; }
    }
}
