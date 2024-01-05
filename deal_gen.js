    (function () {
        // Define the form fields and their properties
        const FormConfig = {
            formTitle : 'Matsmart Braze Deal Generator',
            formFields: [
                { type: 'text', label: 'deal_alias', name: 'deal_alias' },
                { type: 'text', label: 'deal_image_url', name: 'deal_image_url' },
                { type: 'text', label: 'deal_title', name: 'deal_title' },
                { type: 'text', label: 'deal_quantity', name: 'deal_quantity' },
                { type: 'text', label: 'deal_price', name: 'deal_price' },
                { type: 'text', label: 'deal_comparison_price', name: 'deal_comparison_price' },
                { type: 'text', label: 'deal_max_purchase', name: 'deal_max_purchase' },
                { type: 'text', label: 'deal_savings_percentage', name: 'deal_savings_percentage' },
                { type: 'date', label: 'deal_end_date', name: 'deal_end_date' },
                { type: 'select', label: 'deal_end_hour', name: 'deal_end_hour', options: ['0', '1', '2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'] },
                { type: 'text', label: 'deal_params', name: 'deal_params' },
                { type: 'select', label: 'deal_type', name: 'deal_type', options: ['daily', 'normal'] }
            ]
        };

        // Function to generate and render the form
        function renderForm() {
            const formContainer = document.createElement('div');
            formContainer.id = 'form-container'; // Add the form-container id

            // Apply CSS styles to the form container
            formContainer.style.position = 'fixed';
            formContainer.style.top = '0';
            formContainer.style.right = '0';
            formContainer.style.zIndex = '1000';

            const form = document.createElement('form');

            // Apply CSS styles to the form
            form.style.backgroundColor = '#f2f2f2'; // Grey background
            form.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
            form.style.display = 'flex';
            form.style.flexDirection = 'column'; // Vertical alignment
            form.style.width = '300px'; // Wider form
            form.style.padding = '15px'; // Add padding to the form

            // Title at the top-right side of the form
            const formTitle = document.createElement('div');
            formTitle.style.display = 'flex';
            formTitle.style.justifyContent = 'space-between';
            formTitle.style.alignItems = 'center';
            formTitle.style.marginBottom = '10px';

            const titleText = document.createElement('div');
            titleText.textContent = FormConfig.formTitle;
            titleText.style.fontWeight = 'bold';

            formTitle.appendChild(titleText);

            const dismissButton = document.createElement('button');
            dismissButton.type = 'button';
            dismissButton.textContent = 'Dismiss';
            dismissButton.addEventListener('click', dismissForm);

            formTitle.appendChild(dismissButton);

            form.appendChild(formTitle);

            FormConfig.formFields.forEach(field => {
                if (field.type === 'select') {
                    const select = document.createElement('select');
                    select.name = field.name;
                    select.style.width = '100%'; // Full width of the container
                    select.style.boxSizing = 'border-box'; // Include padding and border in the width
                    select.style.marginBottom = '10px'; // Add spacing between fields

                    field.options.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option;
                        optionElement.text = option;
                        select.appendChild(optionElement);
                    });

                    const label = document.createElement('label');
                    label.textContent = field.label;
                    label.style.marginBottom = '5px'; // Adjust the spacing between label and input
                    label.appendChild(select);

                    form.appendChild(label);
                } else {
                    const input = document.createElement('input');
                    input.type = field.type;
                    input.name = field.name;
                    input.placeholder = field.label;
                    input.style.width = '100%';
                    input.style.boxSizing = 'border-box'; // Include padding and border in the width
                    input.style.marginBottom = '10px'; // Add spacing between fields

                    const label = document.createElement('label');
                    label.textContent = field.label;
                    label.style.marginBottom = '5px'; // Adjust the spacing between label and input
                    label.appendChild(input);

                    form.appendChild(label);
                }
            });

            const submitButton = document.createElement('button');
            submitButton.type = 'button';
            submitButton.textContent = 'Generate Code Snippet';

            // Handle form submission
            submitButton.addEventListener('click', generateCodeSnippet);

            form.appendChild(submitButton);

            // Append the form container directly to the body
            document.body.appendChild(formContainer);
            formContainer.appendChild(form);
        }

        // Function to generate a code snippet with form data
        function generateCodeSnippet() {
            const formData = {};
            FormConfig.formFields.forEach(field => {
                formData[field.name] = document.querySelector(`[name="${field.name}"]`).value;
            });

            const codeSnippet = `
            {% assign deal_alias = "${formData.deal_alias}" %}
            {% assign deal_image_url = "${formData.deal_image_url}" %}
            {% assign deal_title = "${formData.deal_title}" %}
            {% assign deal_quantity = ${formData.deal_quantity} %}
            {% assign deal_price = ${formData.deal_price} %}
            {% assign deal_comparison_price = "${formData.deal_comparison_price}" %}
            {% assign deal_max_purchase = ${formData.deal_max_purchase} %}
            {% assign deal_type = "${formData.deal_type}" %}
            {% assign deal_end_date = "${formData.deal_end_date}T${formData.deal_end_hour}:00:00+01:00" %}
            {% assign deal_savings_percentage = ${formData.deal_savings_percentage} %}
            {% assign deal_params = "${formData.deal_params}" %}
            {{content_blocks.\${deal_render}}}
            `;

            // Copy code snippet to clipboard
            copyToClipboard(codeSnippet);

            // Display a message (you can modify this based on your needs)
            alert('Generated Deal setting has been copied to your clipboard!');
        }

        // Function to dismiss the form
        function dismissForm() {
            const formContainer = document.querySelector('#form-container');
            if (formContainer) {
                document.body.removeChild(formContainer);
            }
        }

        // Function to copy text to clipboard
        function copyToClipboard(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }

        // Call the function to render the form
        renderForm();
    })();