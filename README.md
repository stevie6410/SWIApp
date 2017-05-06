# Functional Specification
## Standard Work Instruction App 

SAO require a replacment application for creating standard work instructions on mobile devices. 
Previously the iOS application "Inflowchart" was used to create the documents. The generated files in .pdf
 .inflowchart and .pages format are uploaded to a WebDAV server which has a WI App search web application running on top.
 This enables the users with permmisions to search the repository with limited functionality.

 Due to the discontinuation of Inflowchart and its lack of support in recent iOS vesions, a new cross platform, 
 mobile ready application is required.

# Acronyms

- SWI = Standard Work Instruction 

# Technology
## Server
- **Hosting** 
    - Windows Server 2008 R2
    - IIS 7
- **Database**
    - SQL Server 2008 R2
- **Web Data Service**
    - ASP.Net Web Api 2
    - REST compliant 

 # Client Application
- Standard Web Application (SPA)
- Angular javascript for application framework
- Bootstrap for responsive design
- Electron for native windows support

# Application Security

The application would have the following roles:
- **Basic User**
    - Can read public SWIs and SWIs in their own company
- **Author**
    - Can create SWIs in their own company
- **Approver**
    - Can approve SWIs in their own company 
- **Manager**
    - Can manage users permissions within their company
    - Can make SWIs in their own company public to all B/E

# Modules / Screens

## Login 
Login using BEAV Active Directory. We should not have to maintain seperate authentication details in this application. 
However we may need to store user profile data regarding permissions and defaults.

## Dashboard (Home Page)
The dashboard will act as the application home page and provide top level access to the menus and user specific information.
The dashboard will be built up from "modules" which can show summary or basic detail information. 

- **My Recently Created SWIs**
    - Show the last 5 SWIs created by the logged in user
- **My Approval Queue (Approvers Only)**
    - Show the SWIs which are waiting for the logged in users approval
- **My Work In Progress (Authors Only)**
    - Show the WIP / draft documents which have been started but not published by the logged in user.
- **My Recently Trashed SWIs (Authors Only)**
    - Show the last 5 SWIs trashed by the logged in user 

## SWI Browser Module
This would be the primary screen for searching all SWIs on the device. You will only find the SWIs for which you have the permissions (see Application Security section).

From this screen this screen you would be able to open, export and delete SWIs on the device.  

## SWI Builder Module
This screen is used soley for the creation and modification of the SWIs. It is not intended as the display view. 
This structure means that we can have more control over the display of the SWIs and also simplify the data entry and validation. 

The SWI document is broken into the following sections:
- **Header**
    - Document Title
    - Author
    - Revision
    - Expert
    - Approver
    - Company
    - Private/Public Flag
    - Created On
    - Modified On
- **Health & Safety**
    - List of health and safety icons associated with the process
- **Tooling**
    - List of tooling panels containing an image, tooling number, caption text.
- **Stages**
    - List of process stages. 
    - Option of different layouts. e.g. (Large image & caption), (Small image & caption & care point), (Text only)
    - Dynamic layout, where stages take up the available space on the users device

## SWI Viewer Module
This screen would be used for read only viewing of the SWI. Because the 'SWI Viewer' screen is seperate to the create and edit screens, 
we are able to customise the design for an enhanced user expereince. In previous versions of the application, the 
goal was to produce a PDF document. With the new app, we can focus on paperless documentation with an interactive viewing experience. The SWI viewer is an offline module and so does not require an active internet conneciton. AS such can be used offsite for document already downloaded.

- **Possible Features**
    - Step by step scrolling
    - Dynamic flow layout
    - Image zoom
    - Production time notes
    - Error reporting
    - Usage tracking
    
 ## SWI Repository Module
 From here you would be able to search, upload, download, approve, reject, up-rev and generaly manage documents in the connected SWI reporistory. The repository module requires an active connection to the BEAV domain.
