import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { forkJoin, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  response: any;
  errorMessage: string = '';
  jwtToken: any;
  userDetails: any;
  userRole: any;
  roleList: any;
  roleId1:string ='';
  //results: any[] = [];
  

  constructor(private authService: AuthServiceService,private router: Router) {}

  login() {
    this.errorMessage = '';
    this.response = '';

    const payload = {
      username: this.username,
      password: this.password,
    };

    // Step 1: Authenticate the user
    this.authService.authenticateUser(payload).subscribe(
      (data) => {
        this.response = data;
        this.jwtToken = data.jwtToken;

        if (this.jwtToken) {
          // Step 2: Fetch user details
          this.authService.getUserDetailsByUsername(payload.username).subscribe(
            (userDetails1) => {
              // Step 3: Fetch user role and role list concurrently
              forkJoin({
                userDetails: of(userDetails1),
                
                userRole: this.authService.getUserRoleByUserId(userDetails1.userId),
              }).subscribe(
                (results1) => {
                  const results = results1;
                  console.log('RoleID++:', results1.userRole[0].roleId); // Assign the response correctly
                  if (results1.userRole.toString > 0) {
                      const roleId = results.userRole[0].roleId;
                      this.roleId1=roleId;
                      console.log(this.roleId1);
                  }
                  console.log(results.userRole.roleId);
                  // Step 4: Fetch role list and specific role details concurrently
                  forkJoin({
                    
                    roleList: this.authService.getRoleList(),
                    role: this.authService.getRoleByRoleId(results1.userRole[0].roleId),
                  }).subscribe(
                    (roleData) => {
                      if ("Rollout" ===roleData.role.role.toString() ) {
                        this.navigateToRollout();
                      } else if (roleData.role.role.toString() === 'Admin') {
                        this.router.navigate(['/adminDashboard']);
                      } else {
                        this.router.navigate(['']);  // Default behavior if role is undefined
                      }

                      this.userDetails = results.userDetails;
                      this.userRole = results.userRole;
                      this.roleList = roleData.roleList;
                      

                      console.log('User details:', this.userDetails);
                      console.log('User role:', this.userRole);
                      console.log('Role list:', this.roleList);
                      console.log('Role details:', roleData.role);
                    this.response=roleData.role;
                    },
                  
                    (error) => {
                      console.error('Error fetching role list or role details:', error);
                      this.errorMessage = 'Failed to fetch role data. Please try again.';
                    }
                  );
                },
                (error) => {
                  console.error('Error fetching user details or role:', error);
                  this.errorMessage = 'Failed to fetch user details or role. Please try again.';
                }
              );
            },
            (error) => {
              console.error('Error fetching user details:', error);
              this.errorMessage = 'Failed to fetch user details. Please try again.';
            }
          );
        } else {
          this.errorMessage = 'Token not found. Please log in again.';
        }
      },
      (error) => {
        console.error('Authentication failed:', error);
        if (error.error?.status === 'NOT_FOUND') {
          this.errorMessage = error.error.message || 'Invalid username or password.';
        } else if (error.status === 0) {
          this.errorMessage = 'Unable to connect to the server. Please try again later.';
        } else if (error.status >= 500) {
          this.errorMessage = 'A server error occurred. Please try again later.';
        } else {
          this.errorMessage = error.error?.message || 'An error occurred. Please try again.';
        }
      }
    );
  }

  navigateToRollout() {
    this.router.navigate(['/rolloutDashboard']).then(success => {
      console.log('Navigation successful:', success);
    }).catch(error => {
      console.error('Navigation error:', error);
    });
  }
}

