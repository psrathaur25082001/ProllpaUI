import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiConstantService } from '../../../services/services/api-constant.service';

@Component({
  selector: 'app-rollout-dashboard',
  templateUrl: './rollout-dashboard.component.html',
  styleUrl: './rollout-dashboard.component.css'
})
export class RolloutDashboardComponent {
  selectedFile: File | null = null;
  jsonResponse: any[] = [];
  tableHeaders: string[] = [];
  response:string='';
  errorMessage: string='';
  

  constructor(private http: HttpClient) {}

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.errorMessage = ''; // Clear previous error message

    // Check if the file is an Excel file
    if (this.selectedFile && !this.isExcelFile(this.selectedFile)) {
      alert('please upload correct file');
      this.errorMessage = 'Please upload a valid Excel file (.xls or .xlsx)';
      this.selectedFile = null; // Reset the selected file
    }
  }
  isExcelFile(file: File): boolean {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return fileExtension === 'xls' || fileExtension === 'xlsx';
  }

  // Upload file and get JSON response
  uploadFile() {
    if (!this.selectedFile ) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any[]>(environment.apiUrl+ApiConstantService.getExcelToJsonConvert, formData).subscribe(
      (response) => {
        console.log('Response:', response);
        this.jsonResponse = response;
        
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  submitChanges() {
    console.log('Updated Data:', this.jsonResponse);
    // Optionally send the modified data to the server
    // this.http.post('API_URL', this.jsonResponse).subscribe();
  }
}
