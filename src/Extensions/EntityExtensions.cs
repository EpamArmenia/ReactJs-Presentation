
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq;

namespace Extensions
{
    public static class EntityExtensions
    {
        public static bool AddOrUpdate<T>(this DbSet<T> context, T entity) where T : class, IEntity
        {
            try
            {
                if (entity.Id == 0)
                {
                    context.Add(entity);
                }
                else
                {
                    context.Update(entity);
                }

                return true;
            }
            catch (System.Exception ex)
            {
                return false;
                throw ex;
            }

        }

        public static bool DeleteById<T>(this DbSet<T> context, int id) where T : class, IEntity{
            try
            {
                var item = context.FirstOrDefault(i => i.Id == id);
                context.Remove(item);
                return true;
            }
            catch (System.Exception)
            {
                return false;
                throw;
            }
        }
    }
}