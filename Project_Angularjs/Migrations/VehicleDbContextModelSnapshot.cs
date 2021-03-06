﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Project_Angularjs.Models;

namespace Project_Angularjs.Migrations
{
    [DbContext(typeof(VehicleDbContext))]
    partial class VehicleDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Project_Angularjs.Models.ServiceRecord", b =>
                {
                    b.Property<int>("ServiceRecordId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ConditionDescr")
                        .HasMaxLength(200);

                    b.Property<bool>("IsDelivered");

                    b.Property<string>("ServiceBy")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<decimal>("ServiceCharge")
                        .HasColumnType("money");

                    b.Property<int>("VehicleId");

                    b.HasKey("ServiceRecordId");

                    b.HasIndex("VehicleId");

                    b.ToTable("ServiceRecords");
                });

            modelBuilder.Entity("Project_Angularjs.Models.Vehicle", b =>
                {
                    b.Property<int>("VehicleId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Color")
                        .HasMaxLength(40);

                    b.Property<string>("Condition")
                        .HasMaxLength(40);

                    b.Property<bool>("IsHold");

                    b.Property<string>("MakeBy")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<DateTime>("MakeDate");

                    b.Property<int>("Mileage");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.Property<string>("Note")
                        .HasMaxLength(200);

                    b.Property<string>("VINNumber")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.HasKey("VehicleId");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("Project_Angularjs.Models.ServiceRecord", b =>
                {
                    b.HasOne("Project_Angularjs.Models.Vehicle", "Vehicle")
                        .WithMany("ServiceRecord")
                        .HasForeignKey("VehicleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
