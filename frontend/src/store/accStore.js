import { accForms, accMe, accTemplateForms } from "@/service/acc.service";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAccStore = defineStore("accStore", {
    state: () => ({
        user: null,
        forms: [],
        items: [],
        selectedForm: null,
        pagination: {
            offset: 0,
            limit: 50,
            totalResults: 0,
        },
        loading: false,
        error: null,
    }),

    actions: {
        async fetchUsers() {
            const res = await accMe();

            if (res.ok) {
                const data = await res.json();
                this.user = data;
            }
        },
        async fetchForms(isLoadMore = false) {
            if (this.loading) return;
            this.loading = true;
            this.error = null

            try {
                const { offset, limit } = this.pagination;
                const res = await accForms(offset, limit);

                if (res.ok) {
                    const data = await res.json();
    
                    console.log('data', data)
    
                    if (isLoadMore) {
                        this.forms.push(...data.data);
                    } else {
                        this.forms = data.data;
                    }
    
                    this.items = this.forms.map((form) => ({
                        label: form.name,
                        form: form,
                        command: () => {
                            this.setSelectedForm(form);
                        },
                    }));
    
                    // Update Pagination
                    // this.pagination.offset += limit;
                    this.pagination.totalResults = data.pagination.totalResults;
                } else {
                    const errorData = await res.json();
                    
                    this.error = errorData.detail;
                    // throw new Error(errorData.detail);
                }

            } catch (error) {
                console.error("Error fetching forms:", error);
                this.error = error.message
            } finally {
                this.loading = false;
            }
        },
        setSelectedForm(form) {
            this.selectedForm = form;
            console.log("Selected form:", form);
        },
    },
});

export const useAccTemplateStore = defineStore("accTemplate", () => {
    // State
    const templates = ref([]);
    const loading = ref(false);
    const error = ref(null);

    // Actions
    const fetchTemplates = async () => {
        loading.value = true;
        error.value = null;

        try {
            const response = await accTemplateForms();

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch templates: ${response.statusText}`,
                );
            }

            const data = await response.json();

            if (data?.data) {
                templates.value = data.data;
            } else {
                throw new Error("Invalid data format received from the API");
            }
        } catch (err) {
            error.value = err.message;
            console.error("Failed to fetch templates:", err);
        } finally {
            loading.value = false;
        }
    };

    // Getters (optional)
    const activeTemplates = computed(() => {
        return templates.value.filter(
            (template) => template.status === "active",
        );
    });

    return {
        templates,
        loading,
        error,
        fetchTemplates,
        activeTemplates,
    };
});