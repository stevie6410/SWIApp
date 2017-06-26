using RC.SWI.Entities;
using RC.SWI.ViewModels;
using RC.SWI.ViewModels.ViewModels;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.Services.Services
{
    public class StandardToolingService
    {
        private readonly SWIRepository db;

        public StandardToolingService()
        {
            db = new SWIRepository();
        }

        public async Task<IList<StandardToolVM>> Get()
        {
            var result = await db.StandardTools.ToListAsync();
            if (result == null) return null;
            return result.Select(t => new StandardToolVM(t)).ToList();
        }

        public async Task<StandardToolVM> Get(int id)
        {
            var result = await db.StandardTools.FindAsync(id);
            if (result == null) return null;
            return new StandardToolVM(result);
        }

        public async Task<IList<StandardToolVM>> Search(string term = "", string toolNumber = "", string hasCarePoint = "", string hasLinkedSWI = "")
        {
            try
            {
                var query = db.StandardTools.AsQueryable();

                if (term != string.Empty)
                    query = query.Where(t => t.Name.Contains(term));

                if (toolNumber != string.Empty)
                {
                    int number = int.Parse(toolNumber);
                    query = query.Where(t => t.Id == number);
                }

                if (hasCarePoint != string.Empty)
                {
                    bool carePoint = bool.Parse(hasCarePoint);
                    query = query.Where(t => t.HasCarePoint == carePoint);
                }

                if (hasLinkedSWI != string.Empty)
                {
                    bool linkedSWI = bool.Parse(hasLinkedSWI);
                    query = query.Where(t => (t.SWIMaster != null) == linkedSWI);
                }

                var queryResults = await query.ToListAsync();
                var results = queryResults.Select(r => new StandardToolVM(r)).ToList();
                return results;                
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<StandardToolVM> Create(CreateStandardToolVM tool)
        {
            try
            {
                //Map the CreateToolVM to Standard Entity Model
                var standardTool = tool.ToStandardTool();
                var result = db.StandardTools.Add(standardTool);

                //Set the SWIMaster manualy based on the Id
                var master = await db.SWIMasters.FindAsync(result.SWIMasterId);
                if (master != null) result.SWIMaster = master;
                await db.SaveChangesAsync();
                return new StandardToolVM(result);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return null;
            }
        }

        public async Task<StandardToolVM> Update(StandardToolVM toolVM)
        {
            try
            {
                var tool = toolVM.ToStandardTool();
                var entity = db.Entry(tool);
                entity.State = EntityState.Modified;
                await db.SaveChangesAsync();
                //Refetch the record to maintain relationships in the return object
                var result = await db.StandardTools.Include(t => t.SWIMaster).Where(t => t.Id == entity.Entity.Id).FirstOrDefaultAsync();
                return new StandardToolVM(result);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
                return null;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var tool = await db.StandardTools.FindAsync(id);
                db.StandardTools.Remove(tool);
                await db.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
