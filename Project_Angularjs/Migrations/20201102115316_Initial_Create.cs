using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Project_Angularjs.Migrations
{
    public partial class Initial_Create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    VehicleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MakeBy = table.Column<string>(maxLength: 40, nullable: false),
                    Model = table.Column<string>(maxLength: 40, nullable: false),
                    Color = table.Column<string>(maxLength: 40, nullable: true),
                    Condition = table.Column<string>(maxLength: 40, nullable: true),
                    MakeDate = table.Column<DateTime>(nullable: false),
                    Mileage = table.Column<int>(nullable: false),
                    VINNumber = table.Column<string>(maxLength: 40, nullable: false),
                    IsHold = table.Column<bool>(nullable: false),
                    Note = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.VehicleId);
                });

            migrationBuilder.CreateTable(
                name: "ServiceRecords",
                columns: table => new
                {
                    ServiceRecordId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ServiceBy = table.Column<string>(maxLength: 40, nullable: false),
                    ServiceCharge = table.Column<decimal>(type: "money", nullable: false),
                    ConditionDescr = table.Column<string>(maxLength: 200, nullable: true),
                    IsDelivered = table.Column<bool>(nullable: false),
                    VehicleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceRecords", x => x.ServiceRecordId);
                    table.ForeignKey(
                        name: "FK_ServiceRecords_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "VehicleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ServiceRecords_VehicleId",
                table: "ServiceRecords",
                column: "VehicleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ServiceRecords");

            migrationBuilder.DropTable(
                name: "Vehicles");
        }
    }
}
