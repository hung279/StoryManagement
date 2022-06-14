function getStorys() {
    const myTable = $('#my-table').DataTable({
        processing: true,
        serverSide: true,
        ajax: {
            type: 'GET',
            url: '/api/stories',
            dataSrc: function (json) {
                return json.data;
            },
        },
        columns: [
            { data: null, defaultContent: "", className: "sttColumn" },
            { data: 'name' },
            {
                data: 'thumbnail',
                render: function (data, type, row) {
                    return `<img src="/client/static/image/img_anime/${data}" width=100 height=100 >`;
                },
            },
            { data: 'category' },
            { data: 'chapter' },
            { data: 'author' },
            {
                data: 'id',
                className: "center",
                render: function (data, type, row) {
                    return `<span>
                                <a href="/admin/manage/edit/${data}" class="edit" data-toggle="tooltip" data-placement="top"
                                    title="Edit"><i class="fa fa-pencil color-muted m-r-5"></i>
                                </a>
                                
                                <a href="#" class="remove" data-toggle="modal" data-target="#basicModal" 
                                    title="Close"><i class="fa fa-close color-danger"></i>
                                </a>
                            </span>`;
                },
            },
        ],
        columnDefs: [
            {
                searchable: false,
                orderable: false,
                targets: 0,
            },
            {
                searchable: false,
                orderable: false,
                targets: [0, 2, 6],
            },
        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex) {
            var oSettings = this.fnSettings();
            $("td:first", nRow).html(oSettings._iDisplayStart + iDisplayIndex + 1);
            return nRow;
        },
        language: {
            sProcessing: "Đang xử lý...",
            sLengthMenu: "Chọn số bản ghi hiển thị trên một trang _MENU_",
            sZeroRecords: "Không có dữ liệu để hiển thị.",
            sInfo: "Hiển thị từ _START_ đến _END_ trong tổng số _TOTAL_",
            sInfoEmpty: "Hiển thị từ 0 đến 0 trong tổng số 0 mục",
            sInfoFiltered: "(được lọc từ _MAX_ bản ghi)",
            sInfoPostFix: "",
            sSearch: "Tìm kiếm:",
            sUrl: "",
            oPaginate: {
                sFirst: "Đầu",
                sPrevious: "Trước",
                sNext: "Tiếp",
                sLast: "Cuối",
            },
        }
    });
}

function deleteStory() {
    var table = $('#my-table').DataTable();

    $('#my-table tbody').on('click', 'a.remove', function () {
        const story = table.row($(this).parents('tr')).data();

        $('#remove-confirm').on('click', function () {
            $.ajax({
                url: `/api/stories/${story.id}`,
                type: 'DELETE',
                success: function (res) {
                    if (res.status == 'success') {
                        $('#basicModal').modal('hide');
                        toastr.success('Xóa thành công');
                        table.ajax.reload();
                        return;
                    } else {
                        $('#basicModal').modal('hide');
                        table.ajax.reload();
                        toastr.error('Xóa không thành công');
                        return;
                    }
                },
                error: function () {
                    $('#basicModal').modal('hide');
                    toastr.error('Xóa không thành công');
                }
            });
        })
    });
}

getStorys();
deleteStory();