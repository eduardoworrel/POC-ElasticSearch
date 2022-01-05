using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "Api", Version = "v1" });
});


builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
                      OpBuilder =>
                      {
                          OpBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                      });
});

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api v1"));
// }



app.UseCors();

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
