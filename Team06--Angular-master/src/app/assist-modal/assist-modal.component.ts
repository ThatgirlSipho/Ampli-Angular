import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssistService } from 'src/app/services/assist.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-assist-modal',
  templateUrl: './assist-modal.component.html',
  styleUrls: ['./assist-modal.component.css']
})
export class AssistModalComponent implements OnInit {
  searchTerm: string = '';
  filteredContent: any[] = [];
  allContent: any[] = [];
  searchSubject = new Subject<string>();  // Create a subject to debounce search

  constructor(
    public dialogRef: MatDialogRef<AssistModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assistService: AssistService
  ) {}

  ngOnInit(): void {
    // Use the content passed from the parent component
    if (this.data) {
      this.allContent = [this.data];  // Wrap data in an array if it's a single object
      this.filteredContent = [this.data];
    }
  
    // Debounce the search input
    this.searchSubject.pipe(debounceTime(300)).subscribe(searchTerm => {
      this.filterContent(searchTerm);
    });
  }

  onSearchChange(searchValue: string): void {
    this.searchSubject.next(searchValue);  // Emit search value
  }
  
  filterContent(searchTerm: string): void {
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      this.filteredContent = this.allContent.map(item => {
        const highlightedTitle = this.highlight(item.title, lowerSearchTerm);
        const highlightedContent = this.highlight(item.content, lowerSearchTerm);
        return {
          ...item,
          title: highlightedTitle,
          content: highlightedContent
        };
      }).filter(item => item.title || item.content); // Ensure some match is found
    } else {
      this.filteredContent = this.allContent;
    }
  }
  
  // Function to highlight search terms in HTML
  highlight(html: string, searchTerm: string): string {
    if (!searchTerm) return html;  // Return original HTML if no search term is provided
  
    // Create a temporary element to hold the HTML
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;  // Set the HTML content
  
    // Function to recursively highlight text nodes
    const highlightTextNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {  // Only work on text nodes
        const text = node.textContent || '';
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const highlightedText = text.replace(regex, '<mark>$1</mark>');
  
        // Create a new span with the highlighted text and replace the text node
        const newSpan = document.createElement('span');
        newSpan.innerHTML = highlightedText;
  
        // We cast to Text to ensure we are working with text nodes
        const parent = node.parentNode;
        if (parent) {
          parent.replaceChild(newSpan, node);
        }
      } else {
        // Recursively check child nodes, but convert NodeList to an array to iterate
        Array.from(node.childNodes).forEach(highlightTextNodes);
      }
    };
  
    // Apply highlighting to text nodes
    Array.from(tempElement.childNodes).forEach(highlightTextNodes);
  
    // Return the new HTML with highlighted text
    return tempElement.innerHTML;
  }
  
  
  

  close(): void {
    this.dialogRef.close();
  }
}
