﻿using BackEndCapstone.Data;
using BackEndCapstone.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndCapstone.Repositories
{
    public class UserProfileRepository
    {
        private readonly ApplicationDbContext _context;

        public UserProfileRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public void Add(UserProfile userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
    }
}
