using RC.SWI.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RC.SWI.ViewModels
{
    /// <summary>
    /// Create SWI Master Request
    /// </summary>
    public class CreateSWIMasterVM
    {
        /// <summary>
        /// New SWI Master Id
        /// </summary>
        [Description("The SWI Master Id")]
        public Guid Id { get; set; }
        /// <summary>
        /// New SWI Master document title
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// SWI Type Id
        /// </summary>
        public int TypeId { get; set; }
        /// <summary>
        /// Username requesting the new SWI Master
        /// </summary>
        public string username { get; set; }
        /// <summary>
        /// App version of the client. Must be a valid semver version string (e.g. 1.2.3)
        /// </summary>
        public string AppVersion { get; set; }
        /// <summary>
        /// SWI file converted to a string. Typically generated using JSON.stringify(swi)
        /// </summary>
        public string SWIFile { get; set; }
        /// <summary>
        /// SWI file's ID so that it can be compared to the app catalog before importing
        /// </summary>
        public string SWIFileId { get; set; }
    }
}
