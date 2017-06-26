using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.Models.ViewModels.Mappings
{
    public static class DocumentMapping
    {
        /// <summary>
        /// Mapping of Document domain model to DocumentViewModel
        /// </summary>
        /// <param name="doc"></param>
        /// <returns>DocumentViewModel as return type for WebAPI</returns>
        public static DocumentViewModel ToViewModel(this Document doc)
        {
            var vm = new DocumentViewModel();

            vm.Id = doc.Id;
            vm.Name = doc.Name;
            vm.CreatedOn = doc.CreatedOn;
            vm.CreatedBy = doc.CreatedBy;
            vm.CheckedOut = doc.CheckedOut;
            vm.CheckedOutBy = doc.CheckedOutBy;


            return vm;
        }
    }
}
