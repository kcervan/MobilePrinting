// Get the current User Id
Id currentUserId = UserInfo.getUserId();

// Query the User record to get the current User details
User currentUser = [SELECT Id, UserRoleId FROM User WHERE Id = :currentUserId LIMIT 1];

// Assuming 'CEO' is the Role name you want to set
String roleName = 'CEO';

// Query the Role to get the Role Id based on the provided Role name
Id ceoRoleId = [SELECT Id FROM UserRole WHERE Name = :roleName LIMIT 1].Id;

if (ceoRoleId != null) {
    // Set the Role Id to the 'CEO' Role Id
    currentUser.UserRoleId = ceoRoleId;

    // Update the User record to save the changes
    update currentUser;
} else {
    System.debug('Role with name ' + roleName + ' not found.');
    // Handle the scenario where the provided Role name 'CEO' is not found
}