# Registrations Tab - Admin Panel Guide

## Overview
The **RegistrationsTab** component has been completely rebuilt to display registration data from the "Register for Workshop" and "Register for Recruitment" forms in the Admin Panel.

## Features Implemented ✅

### 1. **Data Fetching from Supabase**
- Automatically fetches workshop registrations from `workshop_registrations` table
- Automatically fetches recruitment registrations from `recruitment_registrations` table
- Data is loaded when the admin panel opens
- Real-time refresh capability

### 2. **Statistics Dashboard**
- Total registrations counter
- Workshop registrations count with calendar icon
- Recruitment registrations count with users icon
- Visual cards with gradient styling

### 3. **Search Functionality**
- Search across name, USN, email (for workshops)
- Search across name, USN, department (for recruitment)
- Real-time filtering as you type
- Search icon with clean UI

### 4. **Two Separate Tabs**
#### Workshop Registrations Tab:
- Displays: Name, USN, Year, Department, Phone, Email, Registration Date
- Shows Lift-Off Workshop registrations
- Export to CSV functionality
- Individual delete buttons

#### Recruitment Registrations Tab:
- Displays: Name, USN, Year, Department, Contact, In Club Status, Club Name, Skills, Registration Date
- Shows Recruitment 2025-26 registrations
- Export to CSV functionality
- Individual delete buttons

### 5. **Actions**
- **Refresh Button**: Reload data from Supabase
- **Export to CSV**: Download registrations as CSV file
- **Delete**: Remove individual registrations (with confirmation)
- **Sort**: Data sorted by timestamp (newest first)

### 6. **UI Components**
- Clean table layout with proper headers
- Badge components for year and status
- Icons for better visual representation
- Empty state messages when no data
- Responsive design for mobile/tablet/desktop

## How to Use

### Accessing the Admin Panel:
1. Go to `/admin` route
2. Login with credentials:
   - **Username**: `1@1.com`
   - **Password**: `12345`

### Viewing Registrations:
1. Click on "Registrations" tab (should be default)
2. You'll see statistics at the top
3. Switch between "Workshop" and "Recruitment" tabs
4. Use search bar to filter results

### Exporting Data:
1. Click the "Export CSV" button
2. CSV file will download automatically
3. Named with timestamp: `workshop_registrations_2025-10-03.csv`

### Refreshing Data:
1. Click the "Refresh" button with circular arrow icon
2. Data will reload from Supabase
3. Toast notification shows number of records loaded

### Deleting Registrations:
1. Click the trash icon next to any registration
2. Confirm deletion in popup
3. Data refreshes automatically

## Technical Details

### Data Flow:
```
User fills form → Data saved to Supabase → Admin views in RegistrationsTab
```

### Supabase Tables:
1. **workshop_registrations**
   - Fields: id, name, usn, year, department, phoneNumber, email, timestamp

2. **recruitment_registrations**
   - Fields: id, name, year, department, usn, contactNumber, inCollegeClub, clubName, skills, timestamp

### Type Safety:
- TypeScript interfaces defined for both registration types
- Supabase types updated in `src/integrations/supabase/types.ts`
- Full type safety throughout the component

## Files Modified/Created:

1. ✅ `/src/components/RegistrationsTab.tsx` - Complete rebuild
2. ✅ `/src/integrations/supabase/types.ts` - Added table definitions

## Testing Checklist:

- [ ] Admin login works
- [ ] Workshop registrations load correctly
- [ ] Recruitment registrations load correctly
- [ ] Search functionality works
- [ ] Export to CSV works
- [ ] Delete functionality works with confirmation
- [ ] Refresh button reloads data
- [ ] Empty states show when no data
- [ ] Responsive design works on mobile

## Future Enhancements (Optional):

- [ ] Add pagination for large datasets
- [ ] Add bulk delete functionality
- [ ] Add email notification to registrants
- [ ] Add filter by date range
- [ ] Add sort by column headers
- [ ] Add registration status (pending/approved/rejected)
- [ ] Add print functionality

## Troubleshooting:

**Issue**: No data showing
- **Solution**: Check Supabase connection in browser console
- **Solution**: Verify tables exist in Supabase dashboard
- **Solution**: Check if data was actually submitted through forms

**Issue**: TypeScript errors
- **Solution**: Ensure `types.ts` has the table definitions
- **Solution**: Restart TypeScript server in VS Code

**Issue**: Delete not working
- **Solution**: Check Supabase RLS (Row Level Security) policies
- **Solution**: Verify user has delete permissions

## Support:

If you encounter issues, check:
1. Browser console for errors
2. Supabase dashboard for data
3. Network tab for failed requests
4. Toast notifications for error messages

---

**Built for**: Soaring Eagles Aerial Robotics Club  
**Last Updated**: October 3, 2025
