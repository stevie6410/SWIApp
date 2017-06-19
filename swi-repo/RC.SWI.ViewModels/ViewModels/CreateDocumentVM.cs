﻿using RC.SWI.ViewModels.Interfaces;

namespace RC.SWI.ViewModels
{
    public class CreateDocumentVM : IDocuemntUpdateVM
    {
        public string Name { get; set; }
        public int UserId { get; set; }
        public int DocumentTypeId { get; set; }
        public string AppVersion { get; set; }
        public string ClientHash { get; set; }
        public byte[] File { get; set; }
    }
}