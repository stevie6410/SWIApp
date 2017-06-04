##############	Critical to v1.0 release ##############	

- SWI file should record the version at which the document was saved. 
	- This will help when dealing with compatibility. Also it can help with any upgrade paths we decide to support.

- Modify the SWI app models to fit the new backend database design
	- This will be a breaking change and will have to mark a new version. We would most likley use v1.0 to mark this change as it keeps the version history simple

-  Add support for stage groupings.
	-   By default everything would be added to group 1
	-   Groups should act like an expandable accordian
	-   Group headers should have support for frag and drop re-ordering as well as up and down buttons (same as the stages)

-   Restructure the tooling to be a child of the groupings
	-   This is necessary as most tooling would be specifiec to each group and not scoped to the document	

- 

##############	Nice to have for v1.0	##############	

-   Add support for filtering the broswer screen with a simple title search
	-   Would have a search button in the page header which would drop down a search textbox
	-   This would need a filter by array property pipe (may be able to get from the DevManager project)

-   Simplify the button menus in the camera control
	-   For example, when in cropping mode, it should only show a "Crop" and "Cancel" button

-   Add support for import validation to check for a version number. If the appVersion property does not exist then assume pre v1.0 and so incompattible with > v1.0
	-   We may consider hosting a seperate environment for a number of weeks at v0.9 so that the testers have a chance to recreate any pre-production documents they wish to.


- Need to make the export swi "recombine" the images
- Need to add a cleanup for the image store
- Need to fix the bu where the loading wheel shows when there is no image
- Need to fix the H&S Icons image control. Showing image placeholder






