export const ACCESSITEMS = [
  {
    
    Items: [
      {
        access: 0,
        disable: false,
        toggle: false,
        title: 'Dashboard',
        type: 'sub',
        children: [
          {
            access: 1,
            disable: false,
            toggle: false,
            title: 'City Schools',
            type: 'link',
          },
          {
            access: 2,
            disable: false,
            toggle: false,
            title: 'City School Details',
            type: 'link',
          },
        ],
      },
      {
        access: 3,
        disable: true,
        toggle: false,
        title: 'Schools',
        type: 'sub',
        children: [
          {
            access: 4,
            disable: false,
            toggle: false,
            title: 'Add School',
            type: 'link',
          },
          {
            access: 5,
            disable: false,
            toggle: false,
            title: 'School Listing',
            type: 'sub',
            children: [
              {
                access: 6,
                disable: false,
                toggle: false,
                title: 'School Profile',
                type: 'link',
              },
            ],
          },
          
        ],
        
      },
      {
        access: 7,
        disable: false,
        toggle: false,
        title: 'Student Management',
        type: 'sub',
        children: [
          {
            access: 8,
            disable: false,
            toggle: false,
            title: 'Student Profile',
            type: 'link',
          },
        ],
      },

      {
        access: 9,
        disable: false,
        toggle: false,
        title: 'Income',
        type: 'sub',
        children: [
          {
            access: 10,
            disable: false,
            toggle: false,
            title: 'Income Details',
            type: 'link',
          },
        ],
      },
      {
        access: 11,
        disable: false,
        toggle: false,
        title: 'Packages',
        type: 'sub',
        children: [
          {
            access: 12,
            disable: false,
            toggle: false,
            title: 'Package Details',
            type: 'link',
          },
          {
            access: 13,
            disable: false,
            toggle: false,
            title: 'Renewable Request',
            type: 'link',
          },
        ],
      },

      {
        access: 14,
        disable: true,
        toggle: true,
        title: 'Settings',
        type: 'sub',
        children: [
          {
            access: 15,
            disable: true,
            toggle: true,
            title: 'User Profile',
            type: 'link',
          },
          {
            access: 16,
            disable: false,
            toggle: false,
            title: 'Block List',
            type: 'link',
          },
          {
            access: 17,
            disable: false,
            toggle: false,
            title: 'Support',
            type: 'link',
          },
          {
            access: 18,
            disable: false,
            toggle: false,
            title: 'Notifications',
            type: 'link',
          },
          {
            access: 19,
            disable: true,
            toggle: true,
            title: 'Change Password',
            type: 'link',
          },
          {
            access: 20,
            disable: true,
            toggle: true,
            title: 'Logout',
            type: 'link',
          },
        ],
      },
      {
        access: 21,
        disable: false,
        toggle: false,
        title: 'User Management',
        type: 'link',
      },
    ]
    }
];
