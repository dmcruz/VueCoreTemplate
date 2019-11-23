using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace VueCore
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseKestrel((context, serverOptions) =>
                {
                    serverOptions.Configure(context.Configuration.GetSection("Kestrel"))
                        .Endpoint("HTTPS", listenOptions =>
                        {
                            listenOptions.HttpsOptions.SslProtocols = SslProtocols.Tls12;
                        });
                })
                .Build();
    }
}
