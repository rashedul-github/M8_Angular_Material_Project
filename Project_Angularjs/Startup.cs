using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Project_Angularjs.Models;

namespace Project_Angularjs
{
    public class Startup
    {
        public Startup(IConfiguration config) { this._config = config; }
        private IConfiguration _config { get; set; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<VehicleDbContext>(o => o.UseSqlServer(this._config.GetConnectionString("DbConnection")));
            services.AddCors(options => {
                options.AddPolicy("EnableCORS", builder => {
                    builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials().Build();
                });
            });
            services.AddMvc()
               .AddJsonOptions(options => {
                   options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                   options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
               });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, VehicleDbContext db)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            if (!db.Database.CanConnect())
            {
                if (db.Database.EnsureCreated())
                {
                    DbSeeder.Seed(db);
                }
            }

            app.UseCors("EnableCORS");
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
        }
    }
}
