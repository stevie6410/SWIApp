using System;

namespace RC.SWI.ViewModels
{
    public class CreateSWIRevisionVM
    {
        public Guid SWIMasterId { get; set; }
        public string AppVersion { get; set; }
        public int UserId { get; set; }
    }
}
