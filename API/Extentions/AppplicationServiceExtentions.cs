using System.Net.Security;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extentions
{
    public static class ApplicationServiceExtentions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddMvcCore();
            services.AddMediatR(typeof(Application.Tickets.List.Handler));
            services.AddMediatR(typeof(Application.Tickets.Detail.Handler));
            services.AddMediatR(typeof(Application.Tickets.Create.Handler));
            services.AddMediatR(typeof(Application.Tickets.Edit.Handler));
            services.AddMediatR(typeof(Application.Tickets.Delete.Handler));

            services.AddMediatR(typeof(Application.Comments.List.Handler));
            services.AddMediatR(typeof(Application.Comments.Detail.Handler));
            services.AddMediatR(typeof(Application.Comments.Create.Handler));
            services.AddMediatR(typeof(Application.Comments.CreateWithAttachments.Handler));
            services.AddMediatR(typeof(Application.Comments.UploadAttachments.Handler));
            services.AddMediatR(typeof(Application.Comments.Edit.Handler));
            services.AddMediatR(typeof(Application.Comments.Delete.Handler));

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}
