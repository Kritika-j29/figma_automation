describe('Test Case 1: Import .png Image', () => {
    beforeEach(() => {
      cy.visit('https://www.figma.com/');
      cy.get('.css-c98hde > path').click();
      cy.get(':nth-child(7) > .css-1q8dusa').click();

      cy.wait(5000);
      cy.get('[name="email"]').type('your-email@example.com');
      cy.get('[name="password"]').type('your-password');

      cy.get('[data-testid="login-button"]').click(); 
      cy.wait(5000);
    });
  
    it('Test Case 1: Import .png Image', () => {

      cy.contains('Import Image').click();
  
      cy.get('[data-testid=import-dialog]').attachFile({
        fileContent: 'https://rktm.link/input-image',
        fileName: 'input-image.png',
        mimeType: 'image/png',
      });
  
      cy.wait(5000);
  
      cy.get('[data-testid=imported-image]').should('be.visible');
    });

    it('Test Case 2: Export as .jpg', () => {
    
        cy.contains('Export as .jpg').click(); 
    
        cy.get('[data-testid=export-format]').select('jpg'); 
    
        cy.contains('Export').click();
    
        cy.wait(5000);
    
        cy.contains('Export successful').should('be.visible');
    
        cy.url().should('include', '/comparison'); 
      });

    it('Test Case 3: Compare Input and Output Images', () => {

          cy.contains('Go to Comparison').click();
      
          cy.wait(5000);
      
          cy.get('[data-testid=input-image]').should('be.visible');
          cy.get('[data-testid=output-image]').should('be.visible');
      
          cy.get('[data-testid=visual-indicator]').should('not.exist');
   
    });

    it('Test Case 4: Navigation between Screens', () => {

        cy.contains('Next').click();

        cy.url().should('include', '/export');

        cy.contains('Back').click();
    
        cy.url().should('include', '/import');
    
      });
      
      it('Test Case 5: Cancel Export', () => {
    
        cy.contains('Cancel').click(); 

        cy.url().should('include', '/import');

        cy.get('[data-testid=exported-image]').should('not.exist');
      });

    it('Test Case 6: Error Handling - Unsupported Image Format', () => {

        const unsupportedImageUrl = 'https://rktm.link/unsupported-image.gif';

        cy.get('[data-testid=import-image-button]').click();

        cy.get('[data-testid=import-dialog]').attachFile({
          fileContent: unsupportedImageUrl,
          fileName: 'unsupported-image.gif',
          mimeType: 'image/gif',
        });
    
        cy.get('[data-testid=import-error-message]').should('be.visible');

        cy.get('[data-testid=imported-image]').should('not.exist');
      });

    it('Test Case 7: Error Handling - Export Without Import', () => {

        cy.contains('Go to Export').click();

        cy.get('[data-testid=export-button]').click();

        cy.get('[data-testid=export-error-message]').should('be.visible');

        cy.contains('Please import an image before exporting').should('be.visible');
      });

  });
