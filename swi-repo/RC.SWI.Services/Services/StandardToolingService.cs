using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using RC.SWI.Common.DTO;
using RC.SWI.Entities;
using RC.SWI.Services.Interfaces;

namespace RC.SWI.Services
{
    public class StandardToolingService : IStandardToolingService
    {
        private readonly SWIRepository _db;

        public StandardToolingService()
        {
            _db = new SWIRepository();
        }

        public async Task<IList<StandardToolDTO>> Get() => (await _db.StandardTools.ToListAsync()).Select(t => new StandardToolDTO(t)).ToList();

        public async Task<StandardToolDTO> Get(int id) => new StandardToolDTO(await _db.StandardTools.FindAsync(id));

        public async Task<IList<StandardToolDTO>> Search(string term = "", string toolNumber = "", string hasCarePoint = "", string hasLinkedSwi = "")
        {
            var query = _db.StandardTools.AsQueryable();

            if (term != string.Empty) query = query.Where(t => t.Name.Contains(term));

            if (toolNumber != string.Empty)
            {
                var number = int.Parse(toolNumber);
                query = query.Where(t => t.Id == number);
            }

            if (hasCarePoint != string.Empty)
            {
                var carePoint = bool.Parse(hasCarePoint);
                query = query.Where(t => t.HasCarePoint == carePoint);
            }

            if (hasLinkedSwi != string.Empty)
            {
                var linkedSwi = bool.Parse(hasLinkedSwi);
                query = query.Where(t => t.SWIMaster != null == linkedSwi);
            }

            var queryResults = await query.ToListAsync();
            var results = queryResults.Select(r => new StandardToolDTO(r)).ToList();
            return results;
        }

        public async Task<StandardToolDTO> Create(CreateStandardToolDTO tool)
        {
            try
            {
                //Map the CreateToolVM to Standard Entity Model
                var standardTool = tool.ToStandardTool();
                var result = _db.StandardTools.Add(standardTool);

                //Set the SWIMaster manualy based on the Id
                var master = await _db.SWIMasters.FindAsync(result.SWIMasterId);
                if (master != null) result.SWIMaster = master;
                await _db.SaveChangesAsync();
                return new StandardToolDTO(result);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<StandardToolDTO> Update(StandardToolDTO toolVm)
        {
            try
            {
                var tool = toolVm.ToStandardTool();
                var entity = _db.Entry(tool);
                entity.State = EntityState.Modified;
                await _db.SaveChangesAsync();
                //Refetch the record to maintain relationships in the return object
                var result = await _db.StandardTools.Include(t => t.SWIMaster).Where(t => t.Id == entity.Entity.Id)
                    .FirstOrDefaultAsync();
                return new StandardToolDTO(result);
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
                var tool = await _db.StandardTools.FindAsync(id);
                if (tool != null) _db.StandardTools.Remove(tool);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}